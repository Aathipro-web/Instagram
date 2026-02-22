// ===== DATA =====
const postsData = [
  {
    id: 1,
    username: "alex_photo",
    avatar: "https://i.pravatar.cc/32?img=1",
    location: "New York, USA",
    image: "https://picsum.photos/seed/insta1/614/614",
    likes: 1243,
    caption: "Golden hour never disappoints 🌅 Every sunset is an opportunity to reset. #photography #goldenhour #newyork",
    comments: [
      { user: "travel_vibes", avatar: "https://i.pravatar.cc/32?img=2", text: "Absolutely stunning! 😍", time: "2h" },
      { user: "foodie_gram", avatar: "https://i.pravatar.cc/32?img=3", text: "This is incredible!", time: "1h" },
      { user: "nature_lens", avatar: "https://i.pravatar.cc/32?img=4", text: "What camera did you use?", time: "45m" },
    ],
    time: "2 HOURS AGO",
    liked: false,
    saved: false,
  },
  {
    id: 2,
    username: "travel_vibes",
    avatar: "https://i.pravatar.cc/32?img=2",
    location: "Santorini, Greece",
    image: "https://picsum.photos/seed/insta2/614/614",
    likes: 3891,
    caption: "Lost in the blue and white 💙🤍 Santorini is a dream come true. #travel #santorini #greece #wanderlust",
    comments: [
      { user: "alex_photo", avatar: "https://i.pravatar.cc/32?img=1", text: "I need to visit this place!", time: "5h" },
      { user: "city_shots", avatar: "https://i.pravatar.cc/32?img=6", text: "Goals! 🙌", time: "3h" },
    ],
    time: "5 HOURS AGO",
    liked: false,
    saved: false,
  },
  {
    id: 3,
    username: "foodie_gram",
    avatar: "https://i.pravatar.cc/32?img=3",
    location: "Tokyo, Japan",
    image: "https://picsum.photos/seed/insta3/614/614",
    likes: 892,
    caption: "Ramen season is every season 🍜🔥 This bowl from a tiny shop in Shinjuku was life-changing. #food #ramen #tokyo #japan",
    comments: [
      { user: "sunset_lover", avatar: "https://i.pravatar.cc/32?img=7", text: "I'm so hungry now 😭", time: "8h" },
      { user: "travel_vibes", avatar: "https://i.pravatar.cc/32?img=2", text: "The best ramen I've ever had was in Tokyo!", time: "6h" },
      { user: "alex_photo", avatar: "https://i.pravatar.cc/32?img=1", text: "Name of the restaurant?", time: "4h" },
    ],
    time: "8 HOURS AGO",
    liked: false,
    saved: false,
  },
  {
    id: 4,
    username: "nature_lens",
    avatar: "https://i.pravatar.cc/32?img=4",
    location: "Patagonia, Argentina",
    image: "https://picsum.photos/seed/insta4/614/614",
    likes: 5672,
    caption: "The end of the world is breathtaking 🏔️ Patagonia is raw, wild, and absolutely magnificent. #nature #patagonia #hiking #adventure",
    comments: [
      { user: "city_shots", avatar: "https://i.pravatar.cc/32?img=6", text: "This is on my bucket list!", time: "12h" },
      { user: "foodie_gram", avatar: "https://i.pravatar.cc/32?img=3", text: "Wow, just wow 🤩", time: "10h" },
    ],
    time: "12 HOURS AGO",
    liked: false,
    saved: false,
  },
  {
    id: 5,
    username: "city_shots",
    avatar: "https://i.pravatar.cc/32?img=6",
    location: "Paris, France",
    image: "https://picsum.photos/seed/insta5/614/614",
    likes: 2134,
    caption: "Paris at night is pure magic ✨🗼 The city of lights never fails to amaze. #paris #france #citylife #nightphotography",
    comments: [
      { user: "nature_lens", avatar: "https://i.pravatar.cc/32?img=4", text: "Magnifique! 🇫🇷", time: "1d" },
      { user: "sunset_lover", avatar: "https://i.pravatar.cc/32?img=7", text: "I miss Paris so much!", time: "20h" },
    ],
    time: "1 DAY AGO",
    liked: false,
    saved: false,
  },
];

const suggestionsData = [
  { username: "sunset_lover", avatar: "https://i.pravatar.cc/32?img=7", reason: "Followed by alex_photo", following: false },
  { username: "urban_explorer", avatar: "https://i.pravatar.cc/32?img=8", reason: "Suggested for you", following: false },
  { username: "coffee_art", avatar: "https://i.pravatar.cc/32?img=9", reason: "Followed by travel_vibes", following: false },
  { username: "mountain_hiker", avatar: "https://i.pravatar.cc/32?img=10", reason: "Suggested for you", following: false },
  { username: "street_style", avatar: "https://i.pravatar.cc/32?img=11", reason: "Followed by foodie_gram", following: false },
];

const storiesData = [
  { username: "alex_photo", avatar: "https://i.pravatar.cc/56?img=1", image: "https://picsum.photos/seed/story1/400/600", time: "2h" },
  { username: "travel_vibes", avatar: "https://i.pravatar.cc/56?img=2", image: "https://picsum.photos/seed/story2/400/600", time: "5h" },
  { username: "foodie_gram", avatar: "https://i.pravatar.cc/56?img=3", image: "https://picsum.photos/seed/story3/400/600", time: "8h" },
  { username: "nature_lens", avatar: "https://i.pravatar.cc/56?img=4", image: "https://picsum.photos/seed/story4/400/600", time: "12h" },
  { username: "city_shots", avatar: "https://i.pravatar.cc/56?img=6", image: "https://picsum.photos/seed/story5/400/600", time: "1d" },
  { username: "sunset_lover", avatar: "https://i.pravatar.cc/56?img=7", image: "https://picsum.photos/seed/story6/400/600", time: "2d" },
];

// ===== STATE =====
let currentStoryIndex = 0;
let storyTimer = null;
let storyProgress = 0;
let currentPostId = null;

// ===== RENDER POSTS =====
function renderPosts() {
  const container = document.getElementById('postsContainer');
  if (!container) return;

  container.innerHTML = postsData.map(post => `
    <div class="post-card" id="post-${post.id}">
      <!-- Header -->
      <div class="post-header">
        <div class="post-avatar-wrap">
          <img src="${post.avatar}" alt="${post.username}" class="post-avatar"/>
        </div>
        <div class="post-user-info">
          <a href="profile.html" class="post-username">${post.username}</a>
          <div class="post-location">${post.location}</div>
        </div>
        <button class="post-more-btn" onclick="showToast('Post options coming soon!')">
          <i class="fas fa-ellipsis-h"></i>
        </button>
      </div>

      <!-- Image -->
      <div class="post-image-wrap" ondblclick="doubleTapLike(${post.id}, this)">
        <img src="${post.image}" alt="Post" class="post-image" loading="lazy"/>
        <div class="heart-anim" id="heartAnim-${post.id}">❤️</div>
      </div>

      <!-- Actions -->
      <div class="post-actions">
        <button class="post-action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})" id="likeBtn-${post.id}" title="Like">
          <i class="${post.liked ? 'fas' : 'far'} fa-heart"></i>
        </button>
        <button class="post-action-btn" onclick="openCommentModal(${post.id})" title="Comment">
          <i class="far fa-comment"></i>
        </button>
        <button class="post-action-btn" onclick="showToast('Link copied to clipboard!')" title="Share">
          <i class="far fa-paper-plane"></i>
        </button>
        <button class="post-save-btn ${post.saved ? 'saved' : ''}" onclick="toggleSave(${post.id})" id="saveBtn-${post.id}" title="Save">
          <i class="${post.saved ? 'fas' : 'far'} fa-bookmark"></i>
        </button>
      </div>

      <!-- Info -->
      <div class="post-info">
        <div class="post-likes" id="likesCount-${post.id}" onclick="showToast('${post.likes.toLocaleString()} likes')">
          ${post.likes.toLocaleString()} likes
        </div>
        <div class="post-caption">
          <span class="caption-username">${post.username}</span>
          <span class="caption-text collapsed" id="caption-${post.id}">${post.caption}</span>
          <button class="more-btn" id="moreBtn-${post.id}" onclick="expandCaption(${post.id})">more</button>
        </div>
        <button class="view-comments-btn" onclick="openCommentModal(${post.id})">
          View all ${post.comments.length} comments
        </button>
        ${post.comments.slice(0, 1).map(c => `
          <div class="post-comment-preview">
            <span class="comment-username">${c.user}</span>
            <span>${c.text}</span>
          </div>
        `).join('')}
        <div class="post-time">${post.time}</div>
      </div>

      <!-- Add Comment -->
      <div class="post-add-comment">
        <button class="comment-emoji-btn" onclick="showToast('😊 Emoji picker coming soon!')">
          <i class="far fa-smile"></i>
        </button>
        <input type="text" placeholder="Add a comment…" class="comment-input" id="commentInput-${post.id}"
          oninput="togglePostBtn(${post.id})"
          onkeydown="if(event.key==='Enter') postComment(${post.id})"/>
        <button class="comment-post-btn" id="postBtn-${post.id}" onclick="postComment(${post.id})">Post</button>
      </div>
    </div>
  `).join('');
}

// ===== RENDER SUGGESTIONS =====
function renderSuggestions() {
  const container = document.getElementById('suggestionsList');
  if (!container) return;

  container.innerHTML = suggestionsData.map((s, i) => `
    <div class="suggestion-item">
      <img src="${s.avatar}" alt="${s.username}" class="suggestion-avatar"/>
      <div class="suggestion-info">
        <a href="profile.html" class="suggestion-username">${s.username}</a>
        <span class="suggestion-reason">${s.reason}</span>
      </div>
      <button class="follow-btn ${s.following ? 'following' : ''}" id="followBtn-${i}" onclick="toggleFollow(${i})">
        ${s.following ? 'Following' : 'Follow'}
      </button>
    </div>
  `).join('');
}

// ===== LIKE =====
function toggleLike(postId) {
  const post = postsData.find(p => p.id === postId);
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;

  const btn = document.getElementById(`likeBtn-${postId}`);
  const countEl = document.getElementById(`likesCount-${postId}`);

  if (btn) {
    btn.classList.toggle('liked', post.liked);
    btn.innerHTML = `<i class="${post.liked ? 'fas' : 'far'} fa-heart"></i>`;
  }

  if (countEl) {
    countEl.textContent = `${post.likes.toLocaleString()} likes`;
  }
}

// ===== DOUBLE TAP LIKE =====
function doubleTapLike(postId, wrap) {
  const post = postsData.find(p => p.id === postId);
  if (!post) return;

  if (!post.liked) {
    post.liked = true;
    post.likes += 1;
    const btn = document.getElementById(`likeBtn-${postId}`);
    const countEl = document.getElementById(`likesCount-${postId}`);
    if (btn) {
      btn.classList.add('liked');
      btn.innerHTML = `<i class="fas fa-heart"></i>`;
    }
    if (countEl) countEl.textContent = `${post.likes.toLocaleString()} likes`;
  }

  const heart = document.getElementById(`heartAnim-${postId}`);
  if (heart) {
    heart.classList.remove('pop');
    void heart.offsetWidth; // reflow
    heart.classList.add('pop');
  }
}

// ===== SAVE =====
function toggleSave(postId) {
  const post = postsData.find(p => p.id === postId);
  if (!post) return;

  post.saved = !post.saved;
  const btn = document.getElementById(`saveBtn-${postId}`);
  if (btn) {
    btn.classList.toggle('saved', post.saved);
    btn.innerHTML = `<i class="${post.saved ? 'fas' : 'far'} fa-bookmark"></i>`;
  }
  showToast(post.saved ? 'Saved to collection' : 'Removed from collection');
}

// ===== EXPAND CAPTION =====
function expandCaption(postId) {
  const caption = document.getElementById(`caption-${postId}`);
  const btn = document.getElementById(`moreBtn-${postId}`);
  if (caption) caption.classList.remove('collapsed');
  if (btn) btn.style.display = 'none';
}

// ===== COMMENT INPUT =====
function togglePostBtn(postId) {
  const input = document.getElementById(`commentInput-${postId}`);
  const btn = document.getElementById(`postBtn-${postId}`);
  if (input && btn) {
    btn.classList.toggle('active', input.value.trim().length > 0);
  }
}

function postComment(postId) {
  const input = document.getElementById(`commentInput-${postId}`);
  if (!input || !input.value.trim()) return;

  const post = postsData.find(p => p.id === postId);
  if (!post) return;

  const newComment = {
    user: "jyosika_s",
    avatar: "https://i.pravatar.cc/32?img=5",
    text: input.value.trim(),
    time: "Just now"
  };

  post.comments.push(newComment);
  input.value = '';
  togglePostBtn(postId);

  // Update view comments button
  const viewBtn = document.querySelector(`#post-${postId} .view-comments-btn`);
  if (viewBtn) viewBtn.textContent = `View all ${post.comments.length} comments`;

  showToast('Comment posted!');
}

// ===== FOLLOW =====
function toggleFollow(index) {
  suggestionsData[index].following = !suggestionsData[index].following;
  const btn = document.getElementById(`followBtn-${index}`);
  if (btn) {
    btn.classList.toggle('following', suggestionsData[index].following);
    btn.textContent = suggestionsData[index].following ? 'Following' : 'Follow';
  }
  showToast(suggestionsData[index].following
    ? `Following ${suggestionsData[index].username}`
    : `Unfollowed ${suggestionsData[index].username}`);
}

// ===== STORY MODAL =====
function openStory(index) {
  currentStoryIndex = index;
  const modal = document.getElementById('storyModal');
  if (modal) {
    modal.classList.add('open');
    loadStory(index);
  }
}

function loadStory(index) {
  const story = storiesData[index];
  if (!story) return;

  document.getElementById('storyUserAvatar').src = story.avatar;
  document.getElementById('storyUsername').textContent = story.username;
  document.getElementById('storyTime').textContent = story.time;
  document.getElementById('storyImage').src = story.image;

  // Reset and start progress
  clearInterval(storyTimer);
  storyProgress = 0;
  const progressEl = document.getElementById('storyProgress');
  if (progressEl) progressEl.style.width = '0%';

  storyTimer = setInterval(() => {
    storyProgress += 0.5;
    if (progressEl) progressEl.style.width = storyProgress + '%';
    if (storyProgress >= 100) {
      clearInterval(storyTimer);
      nextStory();
    }
  }, 25);
}

function nextStory() {
  if (currentStoryIndex < storiesData.length - 1) {
    currentStoryIndex++;
    loadStory(currentStoryIndex);
  } else {
    closeStory();
  }
}

function prevStory() {
  if (currentStoryIndex > 0) {
    currentStoryIndex--;
    loadStory(currentStoryIndex);
  }
}

function closeStory() {
  clearInterval(storyTimer);
  const modal = document.getElementById('storyModal');
  if (modal) modal.classList.remove('open');
}

// ===== COMMENT MODAL =====
function openCommentModal(postId) {
  currentPostId = postId;
  const post = postsData.find(p => p.id === postId);
  if (!post) return;

  const modal = document.getElementById('commentModal');
  const body = document.getElementById('commentModalBody');
  const input = document.getElementById('commentModalInput');
  const postBtn = document.getElementById('postCommentBtn');

  if (body) {
    body.innerHTML = `
      <!-- Post image preview -->
      <div style="display:flex;gap:12px;margin-bottom:16px;align-items:flex-start;">
        <div class="post-avatar-wrap" style="width:32px;height:32px;">
          <img src="${post.avatar}" alt="${post.username}" class="post-avatar"/>
        </div>
        <div>
          <span style="font-weight:600;font-size:13px;">${post.username}</span>
          <p style="font-size:14px;margin-top:4px;">${post.caption}</p>
          <span style="font-size:12px;color:var(--text-secondary);">${post.time}</span>
        </div>
      </div>
      <hr style="border:none;border-top:1px solid var(--border);margin-bottom:16px;"/>
      ${post.comments.map(c => `
        <div class="comment-item">
          <img src="${c.avatar}" alt="${c.user}"/>
          <div class="comment-item-body">
            <span class="comment-username">${c.user}</span>
            <span class="comment-text">${c.text}</span>
            <div class="comment-item-meta">
              <span>${c.time}</span>
              <button class="comment-like-btn" onclick="showToast('Liked comment!')">Like</button>
              <button class="comment-like-btn" onclick="showToast('Reply feature coming soon!')">Reply</button>
            </div>
          </div>
          <button style="color:var(--text-secondary);font-size:12px;" onclick="showToast('Liked!')">
            <i class="far fa-heart"></i>
          </button>
        </div>
      `).join('')}
    `;
  }

  if (input) {
    input.value = '';
    input.oninput = () => {
      if (postBtn) postBtn.classList.toggle('active', input.value.trim().length > 0);
    };
    input.onkeydown = (e) => {
      if (e.key === 'Enter') submitModalComment();
    };
  }

  if (postBtn) {
    postBtn.classList.remove('active');
    postBtn.onclick = submitModalComment;
  }

  if (modal) modal.classList.add('open');
}

function submitModalComment() {
  const input = document.getElementById('commentModalInput');
  const body = document.getElementById('commentModalBody');
  const postBtn = document.getElementById('postCommentBtn');

  if (!input || !input.value.trim()) return;

  const post = postsData.find(p => p.id === currentPostId);
  if (!post) return;

  const newComment = {
    user: "jyosika_s",
    avatar: "https://i.pravatar.cc/32?img=5",
    text: input.value.trim(),
    time: "Just now"
  };

  post.comments.push(newComment);

  // Append to modal body
  if (body) {
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerHTML = `
      <img src="${newComment.avatar}" alt="${newComment.user}"/>
      <div class="comment-item-body">
        <span class="comment-username">${newComment.user}</span>
        <span class="comment-text">${newComment.text}</span>
        <div class="comment-item-meta">
          <span>${newComment.time}</span>
          <button class="comment-like-btn" onclick="showToast('Liked comment!')">Like</button>
          <button class="comment-like-btn" onclick="showToast('Reply feature coming soon!')">Reply</button>
        </div>
      </div>
      <button style="color:var(--text-secondary);font-size:12px;" onclick="showToast('Liked!')">
        <i class="far fa-heart"></i>
      </button>
    `;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  input.value = '';
  if (postBtn) postBtn.classList.remove('active');

  // Update feed
  const viewBtn = document.querySelector(`#post-${currentPostId} .view-comments-btn`);
  if (viewBtn) viewBtn.textContent = `View all ${post.comments.length} comments`;
}

function closeCommentModal() {
  const modal = document.getElementById('commentModal');
  if (modal) modal.classList.remove('open');
}

// ===== NOTIFICATION DROPDOWN =====
const notifBtn = document.getElementById('notifBtn');
const notifDropdown = document.getElementById('notifDropdown');

if (notifBtn && notifDropdown) {
  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    notifDropdown.classList.remove('show');
  });

  notifDropdown.addEventListener('click', (e) => e.stopPropagation());
}

// ===== TOAST =====
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== SEARCH =====
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    if (!query) {
      renderPosts();
      return;
    }
    const filtered = postsData.filter(p =>
      p.username.toLowerCase().includes(query) ||
      p.caption.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query)
    );
    const container = document.getElementById('postsContainer');
    if (!container) return;
    if (filtered.length === 0) {
      container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-secondary);">No posts found for "${query}"</div>`;
    } else {
      postsData.length = 0;
      filtered.forEach(p => postsData.push(p));
      renderPosts();
    }
  });
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeStory();
    closeCommentModal();
  }
  if (e.key === 'ArrowRight' && document.getElementById('storyModal').classList.contains('open')) {
    nextStory();
  }
  if (e.key === 'ArrowLeft' && document.getElementById('storyModal').classList.contains('open')) {
    prevStory();
  }
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderPosts();
  renderSuggestions();
});
