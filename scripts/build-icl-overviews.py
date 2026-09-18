"""Import original task overviews and frame annotations, verifying runtime inputs."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import zipfile


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('repository', type=Path)
    parser.add_argument('archive', type=Path)
    args = parser.parse_args()
    commit = subprocess.check_output(['git', '-C', str(args.repository), 'rev-parse', 'HEAD'], text=True).strip()
    packages = json.loads(Path('dist/data/icl-packages.json').read_text(encoding='utf-8'))
    results = []
    with zipfile.ZipFile(args.archive) as archive:
        for pkg in packages:
            task = pkg['task']
            folder = args.repository / 'ref' / 'icl' / task
            in_repository = (folder / 'icl_manifest.json').exists()
            prefix = f'astra_web_evidence_20260918/reference/icl/{task}/'
            def read(name):
                return (folder / name).read_bytes() if in_repository else archive.read(prefix + name)
            raw_manifest = read('icl_manifest.json')
            raw_sources = read('keyframe_sources.json')
            manifest = json.loads(raw_manifest)
            sources = json.loads(raw_sources)
            by_path = {entry['path']: entry for entry in sources}
            assert len(by_path) == len(sources)
            runtime_images = [(i, x) for i, x in enumerate(pkg['inputs']) if x['type'] == 'localImage']
            assert len(runtime_images) == len(manifest['images']) == len(sources)
            frames = []
            for (i, image), expected in zip(runtime_images, manifest['images']):
                key = expected['path']
                source = by_path[key]
                assert Path(key).name == Path(image['path']).name, (task, key)
                assert sha(read(key)) == image['sha256'] == sha((Path('dist') / image['path']).read_bytes())
                assert pkg['inputs'][i-1]['text'] == 'Historical demonstration: ' + expected['label']
                assert source['frame'] == expected['frame'] and source['camera'] == expected['camera']
                frames.append({'path': image['path'], 'frame': source['frame'],
                               'camera': source['camera'], 'phase': source['phase'],
                               'label': expected['label'], 'sha256': image['sha256']})
            technique = next((line.partition(':')[2].strip() for line in manifest['text'].splitlines()
                              if line.startswith(('Observed sequence:', 'Observed technique:'))), '')
            assert technique, task
            # The overview description is an exact excerpt of the actual supplied context.
            assert technique in pkg['inputs'][0]['text'], task
            raw_preview = read('keyframes_preview.jpg')
            target = Path('dist/media/icl') / task / 'keyframes_preview.jpg'
            target.write_bytes(raw_preview)
            results.append({'task': task, 'overview': str(target.relative_to('dist')).replace('\\', '/'),
                            'overview_sha256': sha(raw_preview), 'description': technique,
                            'frames': frames,
                            'source': {'type': 'git' if in_repository else 'archive',
                                       'location': f'ref/icl/{task}' if in_repository else prefix.rstrip('/'),
                                       'revision': commit if in_repository else args.archive.name,
                                       'manifest_sha256': sha(raw_manifest), 'annotations_sha256': sha(raw_sources)}})
    Path('dist/data/icl-overviews.json').write_text(json.dumps(results, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    print(f'Imported {len(results)} original overviews; {sum(len(r["frames"]) for r in results)} frame/image/label matches verified. '
          f'{sum(r["source"]["type"] == "git" for r in results)} tasks cross-checked against IN-MANU {commit}.')


if __name__ == '__main__':
    main()
