/* Projects are maintained in projects.json. No framework or build step required. */
async function renderProjects() {
  const grid = document.getElementById('projects');
  const status = document.getElementById('load-status');
  const textElement = (tag, className, text) => {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  };
  try {
    const response = await fetch('projects.json');
    if (!response.ok) throw new Error('Project collection could not be loaded.');
    const projects = await response.json();
    if (!Array.isArray(projects) || projects.length === 0) throw new Error('Project collection is empty.');
    const cards = document.createDocumentFragment();
    projects.forEach((project, index) => {
      if (!project.title || !project.description || !project.image || !project.url || !Array.isArray(project.tags)) {
        throw new Error('A project is missing required information.');
      }
      const url = new URL(project.url);
      if (url.protocol !== 'https:') throw new Error('Project URLs must use HTTPS.');
      const article = document.createElement('article');
      article.className = 'project';
      const link = document.createElement('a');
      link.className = 'project-link';
      link.href = url.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `${project.title} — view project on GitHub (opens in a new tab)`);
      const imageWrap = document.createElement('div');
      imageWrap.className = 'project-image-wrap';
      const image = document.createElement('img');
      image.className = 'project-image';
      const motionPreference = project.poster ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
      let previewPlaying = !motionPreference?.matches;
      image.src = project.poster && !previewPlaying ? project.poster : project.image;
      image.alt = project.imageAlt || '';
      image.width = 800;
      image.height = 500;
      image.loading = index < 2 ? 'eager' : 'lazy';
      image.decoding = 'async';
      imageWrap.append(image);
      const meta = document.createElement('div');
      meta.className = 'project-meta';
      meta.append(textElement('span', 'project-category', project.category || 'Project'), textElement('span', 'project-number', String(index + 1).padStart(2, '0')));
      const heading = textElement('h3', '', project.title);
      const arrow = textElement('span', 'project-arrow', '↗');
      arrow.setAttribute('aria-hidden', 'true');
      heading.append(arrow);
      const bottom = document.createElement('div');
      bottom.className = 'project-bottom';
      const tags = document.createElement('ul');
      tags.className = 'tags';
      tags.setAttribute('aria-label', 'Technologies');
      project.tags.forEach(tag => tags.append(textElement('li', '', tag)));
      bottom.append(tags, textElement('span', 'project-action', project.demoUrl ? 'View code ↗' : 'View project'));
      link.append(imageWrap, meta, heading, textElement('p', 'project-description', project.description), bottom);
      article.append(link);
      if (project.demoUrl || project.poster) {
        const actions = textElement('div', 'project-demo-row', '');
        if (project.demoUrl) {
          const demoUrl = new URL(project.demoUrl);
          if (demoUrl.protocol !== 'https:') throw new Error('Demo URLs must use HTTPS.');
          // A sibling anchor keeps the card link valid and gives keyboard users two destinations.
          const demo = textElement('a', 'project-demo', 'Live demo ↗');
          demo.href = demoUrl.href;
          demo.target = '_blank';
          demo.rel = 'noopener noreferrer';
          demo.setAttribute('aria-label', `${project.title} — try the live demo (opens in a new tab)`);
          const hint = textElement('span', 'project-demo-hint', 'No installation · Fictional data');
          actions.append(demo, hint);
        }
        if (project.poster) {
          const motionButton = textElement('button', 'project-motion', '');
          motionButton.type = 'button';
          const updatePreview = () => {
            image.src = previewPlaying ? project.image : project.poster;
            motionButton.textContent = previewPlaying ? 'Pause preview' : 'Play preview';
            motionButton.setAttribute('aria-label', `${previewPlaying ? 'Pause' : 'Play'} ${project.title} animated preview`);
          };
          motionButton.addEventListener('click', () => {
            previewPlaying = !previewPlaying;
            updatePreview();
          });
          motionPreference.addEventListener('change', event => {
            previewPlaying = !event.matches;
            updatePreview();
          });
          updatePreview();
          actions.append(motionButton);
        }
        article.append(actions);
      }
      if (project.walkthroughUrl) {
        const walkthroughUrl = new URL(project.walkthroughUrl);
        if (walkthroughUrl.protocol !== 'https:') throw new Error('Walkthrough URLs must use HTTPS.');
        const walkthrough = textElement('a', 'project-walkthrough', 'Watch the 2-minute walkthrough ↗');
        walkthrough.href = walkthroughUrl.href;
        walkthrough.setAttribute('aria-label', `${project.title} — watch the two-minute technical walkthrough`);
        article.append(walkthrough);
      }
      cards.append(article);
    });
    grid.replaceChildren(cards);
    document.querySelector('.project-count').textContent = `${projects.length} projects`;
    status.hidden = true;
  } catch (error) {
    console.error(error);
    status.textContent = 'The project gallery couldn’t load. ';
    const link = textElement('a', '', 'Explore my projects on GitHub.');
    link.href = 'https://github.com/Kuvelet';
    status.append(link);
  }
}
renderProjects();
