import React from 'react';

function openLink(url) {
  window.open(url, '_blank');
}

function ExternalLink({ children, link, className }) {
  return (
    <button
      className={className}
      type="button"
      onClick={() => openLink(link)}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </button>
  );
}

export default ExternalLink;
