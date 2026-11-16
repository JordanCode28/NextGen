window.onload = () => {
  setTimeout(() => {
    document.getElementById('loading-page').classList.add('fade-out');
  }, 1200);
  afficherCommentaires();
};

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('mobileNav');
const pages = document.querySelectorAll('.page');

hamburger.onclick = () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
};

nav.querySelectorAll('a').forEach(link => {
  link.onclick = e => {
    e.preventDefault();
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(link.dataset.page).classList.add('active');
    nav.classList.remove('active');
    hamburger.classList.remove('active');
  };
});

//   catégories
const categoryButtons = {
  pantshopBtn: 'pantshop',
  beauterbtn: 'beauter',
  chaussuresBtn: 'chaussures',
  mayoBtn: 'mayo',
  lunettesBtn: 'lunettes',
  collierBtn: 'collier',
  cadeauxBtn: 'cadeaux',
  chapeauBtn: 'chapeau',
  marketingBtn: 'marketing'
};

Object.keys(categoryButtons).forEach(btnId => {
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.onclick = () => {
      pages.forEach(p => p.classList.remove('active'));
      document.getElementById(categoryButtons[btnId]).classList.add('active');
      nav.classList.remove('active');
      hamburger.classList.remove('active');
    };
  }
});

// ===== gestion de  commentaire =====
function getComments() {
  const comments = localStorage.getItem('nextgen_comments');
  return comments ? JSON.parse(comments) : [];
}

function saveComments(comments) {
  localStorage.setItem('nextgen_comments', JSON.stringify(comments));
}

function afficherCommentaires() {
  const container = document.getElementById('commentsList');
  const comments = getComments();
  
  if (comments.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; opacity: 0.6; padding: 40px 20px;">
        <p style="font-size: 1.2rem;">🌟 Aucun commentaire pour le moment.</p>
        <p>Soyez le premier à donner votre avis !</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = comments.map((comment, index) => `
    <div class="comment-card">
      <div class="comment-author">${comment.nom}</div>
      <div class="comment-date">${comment.date}</div>
      <div class="comment-text">${comment.message}</div>
    </div>
  `).join('');
}

document.getElementById('commentForm').onsubmit = (e) => {
  e.preventDefault();
  
  const nom = document.getElementById('commentName').value.trim();
  const message = document.getElementById('commentContent').value.trim();
  
  if (!nom || !message) {
    alert('Veuillez remplir tous les champs.');
    return;
  }
  
  const comments = getComments();
  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) + 
                  ' à ' + now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  
  comments.unshift({
    nom: nom,
    message: message,
    date: dateStr
  });
  
  saveComments(comments);
  afficherCommentaires();
  
  document.getElementById('commentName').value = '';
  document.getElementById('commentContent').value = '';
  
  alert('✅ Votre commentaire a été publié avec succès !');
};
