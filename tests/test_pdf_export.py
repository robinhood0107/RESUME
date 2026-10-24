import copy
import json
import unittest
from pathlib import Path

from scripts.export_typst_data import export_data


class PdfExportContractTests(unittest.TestCase):
    def setUp(self):
        self.source = json.loads((Path(__file__).resolve().parents[1] / "src/data/resume.json").read_text())

    def test_both_languages_keep_all_project_links(self):
        output = export_data(self.source)
        for lang in ("ko", "en"):
            links = {e["link"] for s in output[lang]["sections"] for e in s["entries"] if e["link"]}
            expected = {e["link"] for s in self.source[lang]["sections"] for e in s["entries"] if e["link"]}
            self.assertEqual(links, expected)
            self.assertNotIn("about", output[lang])

    def test_private_path_is_rejected_before_export(self):
        source = copy.deepcopy(self.source)
        source["ko"]["about"] = "자료 위치: /mnt/c/private"
        with self.assertRaises(ValueError):
            export_data(source)

    def test_changed_language_link_is_rejected(self):
        source = copy.deepcopy(self.source)
        source["en"]["sections"][0]["entries"][0]["link"] = "https://example.com/wrong"
        with self.assertRaises(ValueError):
            export_data(source)

    def test_translated_link_titles_keep_the_same_destination(self):
        source = copy.deepcopy(self.source)
        source["ko"]["sections"][0]["entries"][0]["additional_links"] = [{"title": "자료", "url": "https://example.com/source"}]
        source["en"]["sections"][0]["entries"][0]["additional_links"] = [{"title": "Source", "url": "https://example.com/source"}]
        self.assertEqual(set(export_data(source)), {"ko", "en"})


if __name__ == "__main__":
    unittest.main()
