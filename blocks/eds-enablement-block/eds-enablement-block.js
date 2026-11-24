import { createOptimizedPicture } from '../../scripts/aem.js';

const REQUIRED_CLASSES = ['session-two', 'session-practice'];

/**
 * EDS Enablement Block.
 * Each authored row becomes a panel: a cell holding only a picture is the media,
 * every other cell is the content. Links in the content become CTA buttons.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  block.classList.add(...REQUIRED_CLASSES);

  const badge = document.createElement('p');
  badge.className = 'eds-enablement-block-badge';
  badge.textContent = 'EDS Enablement · Session 2';

  const panels = [...block.children].map((row) => {
    const panel = document.createElement('div');
    panel.className = 'eds-enablement-block-panel';

    [...row.children].forEach((cell) => {
      const isMedia = cell.children.length === 1 && cell.querySelector(':scope > picture');
      if (isMedia) {
        const img = cell.querySelector('img');
        const media = document.createElement('div');
        media.className = 'eds-enablement-block-media';
        media.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
        panel.append(media);
      } else if (cell.textContent.trim() || cell.querySelector('picture')) {
        cell.className = 'eds-enablement-block-content';
        cell.querySelectorAll('a').forEach((a) => a.classList.add('button'));
        panel.append(cell);
      }
    });

    return panel;
  }).filter((panel) => panel.children.length);

  block.replaceChildren(badge, ...panels);
}
