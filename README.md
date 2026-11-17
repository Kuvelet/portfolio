# Can Kuvelet — Portfolio

Live website: https://kuvelet.github.io/portfolio/

A static portfolio hosted on GitHub Pages. The current design places the profile and introduction above the project gallery on both desktop and mobile. SMP Intelligence leads the gallery, followed by Vehicle Application Coverage Tool and the nine existing projects. No framework, dependency installation, or build command is required.

## Add a project

1. Publish the project repository and its README on GitHub.
2. Upload its preview image to `images/` in this portfolio repository.
3. Edit `projects.json` and add an object like the example below. Put it first to display it at the top of the portfolio.
4. Commit the image and project entry to `main`. GitHub Pages publishes the update automatically. The project count adjusts automatically.

```json
{
  "title": "Short project title",
  "category": "Workflow automation",
  "description": "What you built and the business problem it solves, in one or two sentences.",
  "tags": ["Python", "SQL Server"],
  "image": "images/project-preview.webp",
  "imageAlt": "A brief description of the preview image",
  "url": "https://github.com/Kuvelet/your-project-repository"
}
```

Separate objects with commas; don't add a trailing comma after the last object. Use two or three short tags. Landscape images near a 16:10 aspect ratio work best. Image paths are case-sensitive on GitHub Pages. Use a screenshot, diagram, or clearly illustrative image appropriate to the project.

Adding a repository to GitHub does not automatically add it to this website: the entry in `projects.json` controls what appears here.

## Edit the website

- `index.html`: profile, introduction, and contact links.
- `projects.json`: project titles, descriptions, tags, images, links, and display order.
- `assets/css/portfolio.css`: visual design and responsive layouts.
- `assets/js/portfolio.js`: project gallery rendering and error handling.

To preview locally, run `python -m http.server 8080` in the repository and open http://localhost:8080/. Use an HTTP server rather than opening the HTML file directly, so the browser can load `projects.json`.

Older site designs remain in Git history. Original Strata template assets and license files are retained; the current page uses its own layout and styles.
