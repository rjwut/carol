// Sets up nav and footnote links, and the close bar for the footnotes panel
// (only visible on small devices).
function init() {
  document.querySelectorAll('nav a').forEach(function(a, i) {
    a.addEventListener('click', onNavClick);
  });
  document.querySelectorAll('article a').forEach(function(a, i) {
    a.id = (i + 1);
    a.href = 'footnotes.html#' + (i + 1);
    a.target = 'footnotes';
    a.innerText = (i + 1);
    a.addEventListener('click', onFootnoteClick);
  });
  document.querySelector('aside div').addEventListener('click', closeFootnotes);
}

// If the footnotes panel is visible, scrolls it to the top of the corresponding
// section of footnotes.
function onNavClick(ev) {
  if (isFootnotesPaneVisible()) {
    var url = ev.target.href;
    var hash = url.substr(url.indexOf('#'));
    document.querySelector('iframe').src = 'footnotes.html' + hash;
  }
}

// Displays the footnotes panel (if it's not visible) when the reader clicks a
// footnote link.
function onFootnoteClick(ev) {
  if (!isFootnotesPaneVisible()) {
    // show footnotes pane and defer navigation until after it appears
    ev.preventDefault();
    document.body.className = 'footnotes';
    window.setTimeout(function() {
      document.querySelector('iframe').src = ev.target.href;
    }, 1);
  }
}

// Hides the footnotes pane on small devices. (On larger ones, it's always
// visible, and this function has no visible effect.)
function closeFootnotes() {
  document.body.className = '';
}

// Returns if the footnotes pane is visible; false otherwise. On small devices,
// it is displayed when the reader taps a footnote link; on larger ones, it's
// always visible.
function isFootnotesPaneVisible() {
  return getComputedStyle(document.querySelector('aside')).display !== 'none';
}
