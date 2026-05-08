<div align="center" id="top">

  <a href="https://github.com/maurodesouza/github-readme-activity-graph-action">
    <img src="https://raw.githubusercontent.com/Ashutosh00710/github-readme-activity-graph/master/asset/logo.png" alt="GitHub Readme Activity Graph" width="200"/>
  </a>

  <h1>GitHub Readme Activity Graph Action</h1>
  <h3>Generate beautiful activity graphs for your GitHub profile! 🚀</h3>

  <a href="https://github.com/maurodesouza/github-readme-activity-graph-action/fork" target="_blank">
    <img src="https://img.shields.io/github/forks/maurodesouza/github-readme-activity-graph-action?style=social" alt="Forks"/>
  </a>

  <a href="https://github.com/maurodesouza/github-readme-activity-graph-action/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/maurodesouza/github-readme-activity-graph-action?style=social" alt="Stars"/>
  </a>

  <a href="https://github.com/maurodesouza/github-readme-activity-graph-action/issues" target="_blank">
    <img src="https://img.shields.io/github/issues/maurodesouza/github-readme-activity-graph-action" alt="Issues"/>
  </a>

  <a href="https://github.com/maurodesouza/github-readme-activity-graph-action/pulls" target="_blank">
    <img src="https://img.shields.io/github/issues-pr/maurodesouza/github-readme-activity-graph-action" alt="Pull Requests"/>
  </a>

  <a href="https://github.com/maurodesouza/github-readme-activity-graph-action/blob/master/LICENSE.md" target="_blank">
    <img src="https://img.shields.io/github/license/maurodesouza/github-readme-activity-graph-action?color=f85149" alt="License"/>
  </a>

</div>

<p align="center">
  <a href="#rocket-quick-start">Quick Start</a> &#xa0; | &#xa0;
  <a href="#clipboard-inputs">Inputs</a> &#xa0; | &#xa0;
  <a href="#books-options-reference">Options Reference</a>
</p>

## :rocket: Quick Start

Generate activity graph cards using [GitHub Readme Activity Graph](https://github.com/Ashutosh00710/github-readme-activity-graph) within your GitHub Actions workflow. The output is automatically published to a dedicated branch, keeping your main history clean and ready to embed in your README.

### Example Workflow

```yaml
name: Update Activity Graph

on:
  schedule: # execute every 12 hours
    - cron: "* */12 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v6

      - name: Generate activity graph
        uses: maurodesouza/github-readme-activity-graph-action@v1
        with:
          username: ${{ github.repository_owner }}
          options: theme=dracula&hide_border=true
          output_path: dist/activity-graph.svg
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Push activity-graph.svg to the output branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Then embed from your profile README:

```md
![Activity Graph](https://raw.githubusercontent.com/{owner}/{repo}/output/activity-graph.svg)
```

## :clipboard: Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `username` | GitHub username to generate the activity graph for | `true` | - |
| `options` | Card options as a query string (`key=value&...`) or JSON | `false` | `""` |
| `output_path` | Output path for the SVG file (relative path; include filename with .svg) | `false` | `""` (defaults to `dist/activity-graph.svg`) |
| `token` | GitHub token (PAT or `GITHUB_TOKEN`). Falls back to `github.token` if not provided | `false` | `""` |

## :books: Options Reference

| Argument | Description | Type |
|----------|-------------|------|
| `bg_color` | Card's background color | hex code (without `#`) |
| `border_color` | Card's border color | hex code (without `#`) |
| `color` | Graph card's text color | hex code (without `#`) |
| `title_color` | Graph card's title color | hex code (without `#`) |
| `line` | Graph's line color | hex code (without `#`) |
| `point` | Color of points on line graph | hex code (without `#`) |
| `area_color` | Color of the area under the graph | hex code (without `#`) |
| `area` | Shows area under the graph | boolean (default: `false`) |
| `hide_border` | Makes the border of the graph transparent | boolean (default: `false`) |
| `hide_title` | Sets the title to an empty string | boolean (default: `false`) |
| `custom_title` | Set the title to any string (use `%20` for spaces) | string |
| `theme` | Name of available theme | string |
| `radius` | Border radius of graph | number (0-16) |
| `height` | Height of the graph | number (200-600) |
| `days` | Number of days to display on graph | number (1-90, recommended below 40) |
| `from` | Date from which the graph starts | format `YYYY-MM-DD` |
| `to` | Date where the graph will end | format `YYYY-MM-DD` |
| `grid` | Show grid | boolean (default: `true`) |

For the full list of customization options, check the [original project](https://github.com/Ashutosh00710/github-readme-activity-graph#customization).

### Available Themes

|            Name            |                            Preview                             |
| :------------------------: | :------------------------------------------------------------: |
| **Default (cotton candy)** |    <img src="https://raw.githubusercontent.com/Ashutosh00710/github-readme-activity-graph/master/asset/default.svg" height=250 alt="graph"/>     |
|         **react**          |     <img src="https://raw.githubusercontent.com/Ashutosh00710/github-readme-activity-graph/master/asset/react.png" height=250 alt="graph"/>      |
|       **react-dark**       |   <img src="https://raw.githubusercontent.com/Ashutosh00710/github-readme-activity-graph/master/asset/react-dark.svg" height=250 alt="graph"/>   |
|         **github**         |     <img src="https://raw.githubusercontent.com/Ashutosh00710/github-readme-activity-graph/master/asset/github.svg" height=250 alt="graph"/>     |
|     **github-compact**     | <img src="https://raw.githubusercontent.com/Ashutosh00710/github-readme-activity-graph/master/asset/github-compact.svg" height=250 alt="graph"/> |
|         **xcode**          |     <img src="https://raw.githubusercontent.com/Ashutosh00710/github-readme-activity-graph/master/asset/xcode.svg" height=250 alt="graph"/>      |
|         **rogue**          |     <img src="https://raw.githubusercontent.com/Ashutosh00710/github-readme-activity-graph/master/asset/rogue.svg" height=250 alt="graph"/>      |
|         **merko**          |     <img src="https://raw.githubusercontent.com/Ashutosh00710/github-readme-activity-graph/master/asset/merko.png" height=250 alt="graph"/>      |
|          **vue**           |      <img src="https://raw.githubusercontent.com/Ashutosh00710/github-readme-activity-graph/master/asset/vue.png" height=250 alt="graph"/>       |
|      **tokyo-night**       |  <img src="https://raw.githubusercontent.com/Ashutosh00710/github-readme-activity-graph/master/asset/tokyo-night.png" height=250 alt="graph"/>   |
|     **high-contrast**      | <img src="https://raw.githubusercontent.com/Ashutosh00710/github-readme-activity-graph/master/asset/high-contrast.png" height=250 alt="graph"/>  |

For more themes, check the [original project](https://github.com/Ashutosh00710/github-readme-activity-graph#available-themes).

## :memo: License

This project is licensed under the MIT License. For more details, please refer to the [LICENSE](LICENSE.md) file.


Made with :heart: by [Mauro de Souza](https://github.com/maurodesouza).<br/>
Based on [GitHub Readme Activity Graph](https://github.com/Ashutosh00710/github-readme-activity-graph) by [Ashutosh00710](https://github.com/Ashutosh00710).

<a href="#top">Back to top</a>

*Readme created with [Simple Readme](https://marketplace.visualstudio.com/items?itemName=maurodesouza.vscode-simple-readme)*
