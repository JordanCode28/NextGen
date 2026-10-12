/* NEXTGEN — gestion des commentaires sur la page commentaires.html
   Note : localStorage enregistre les commentaires uniquement dans le navigateur actuel.
   Pour partager les avis entre visiteurs, il faudra connecter une API et une base de données. */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('commentsList');
  const form = document.getElementById('commentForm');
  if (!container || !form) return;

  const getComments = () => {
    try { return JSON.parse(localStorage.getItem('nextgen_comments') || '[]'); }
    catch { return []; }
  };
  const saveComments = comments => localStorage.setItem('nextgen_comments', JSON.stringify(comments));

  const escapeHTML = value => value.replace(/[&<>"']/g, char => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[char]));

  const afficherCommentaires = () => {
    const comments = getComments();
    if (!comments.length) {
      container.innerHTML = '<div class="comments-empty"><p>🌟 Aucun commentaire pour le moment.</p><p>Soyez le premier à donner votre avis !</p></div>';
      return;
    }
    container.innerHTML = comments.map(comment => `
      <div class="comment-card">
        <div class="comment-author">${escapeHTML(String(comment.nom || ''))}</div>
        <div class="comment-date">${escapeHTML(String(comment.date || ''))}</div>
        <div class="comment-text">${escapeHTML(String(comment.message || ''))}</div>
      </div>`).join('');
  };

  form.addEventListener('submit', event => {
    event.preventDefault();
    const nameInput = document.getElementById('commentName');
    const messageInput = document.getElementById('commentContent');
    const nom = nameInput.value.trim();
    const message = messageInput.value.trim();
    if (!nom || !message) { alert('Veuillez remplir tous les champs.'); return; }
    const now = new Date();
    const date = now.toLocaleDateString('fr-FR', { day:'2-digit', month:'2-digit', year:'numeric' }) +
      ' à ' + now.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' });
    const comments = getComments();
    comments.unshift({ nom, message, date });
    saveComments(comments);
    afficherCommentaires();
    form.reset();
    alert('✅ Votre commentaire a été publié avec succès !');
  });

  afficherCommentaires();
});
