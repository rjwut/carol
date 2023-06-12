var hash = null;

// Apply IDs to each entry so that footnotes can reference them, and set up the
// highlighter to react to hash changes.
function init() {
  document.querySelectorAll('dt').forEach(function(dt, i) {
    dt.id = i + 1;
    const link = document.createElement('a');
    link.href = 'index.html#' + (i + 1);
    link.target = '_parent'
    link.textContent = (i + 1) + '.';
    dt.insertBefore(link, dt.firstChild);
  });
  document.querySelectorAll('dd').forEach(function(dd, i) {
    dd.id = i + 1 + 'd';
  });
  window.addEventListener('hashchange', function() {
    var newHash = location.hash.substr(1);
    var firstChar = newHash.length ? newHash.charAt(0) : '';

    if (firstChar < '0' || firstChar > '9') {
      return; // only highlight an individual footnote
    }

    if (hash) {
      applyClassName(hash, '');
    }

    hash = newHash;
    applyClassName(hash, 'highlight');
  });
}

// Applies the given class to the two parts of the indicated entry.
function applyClassName(index, className) {
  document.getElementById(index).className = className;
  document.getElementById(index + 'd').className = className;
}
