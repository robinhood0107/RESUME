from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from scripts.serve_preview import PreviewHandler


class PreviewBoundaryTests(unittest.TestCase):
    def test_deployment_prefix_maps_to_the_export(self):
        with TemporaryDirectory() as folder:
            handler = object.__new__(PreviewHandler)
            handler.directory = folder
            self.assertEqual(Path(handler.translate_path('/RESUME/portfolio/?page=1')), Path(folder) / 'portfolio')

    def test_parent_paths_cannot_expose_workspace_files(self):
        with TemporaryDirectory() as folder:
            handler = object.__new__(PreviewHandler)
            handler.directory = folder
            for route in ['/RESUME/../../README.md', '/RESUME/%2e%2e/%2e%2e/.env', '/README.md']:
                self.assertTrue(Path(handler.translate_path(route)).resolve().is_relative_to(Path(folder).resolve()))


if __name__ == '__main__':
    unittest.main()
