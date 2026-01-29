import { type FormEvent, useMemo, useState } from "react";
import "../css/home.css";

type User = { id: string; username: string };
type Comment = {
  id: string;
  postId: string;
  author: User;
  body: string;
  createdAt: string;
};
type Post = {
  id: string;
  author: User;
  body: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
};

function timeLabel(iso: string) {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "" : d.toLocaleString();
}

const seedPosts: Post[] = [
  {
    id: "p1",
    author: { id: "u1", username: "kiri" },
    body: "Dark UI, strict tokens, no random CSS. That’s the whole point.",
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    likeCount: 12,
    commentCount: 2,
  },
  {
    id: "p2",
    author: { id: "u2", username: "nocturne" },
    body: "Server-side auth is the boundary. UI is just decoration.",
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    likeCount: 34,
    commentCount: 1,
  },
];

const seedComments: Comment[] = [
  {
    id: "c1",
    postId: "p1",
    author: { id: "u3", username: "devops" },
    body: "Agree. One theme file, one UI layer, then pages.",
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: "c2",
    postId: "p1",
    author: { id: "u4", username: "frontend" },
    body: "The moment someone adds inline styles, the aesthetic dies.",
    createdAt: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
  },
  {
    id: "c3",
    postId: "p2",
    author: { id: "u5", username: "security" },
    body: "UI-only admin mode is still a footgun. Good call.",
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
];

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>(seedPosts);
  const [comments, setComments] = useState<Comment[]>(seedComments);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    p1: true,
  });
  const [composer, setComposer] = useState("");
  const [composerError, setComposerError] = useState<string | null>(null);

  // pretend current user exists (swap with /api/me later)
  const me: User = { id: "me", username: "you" };

  function toggleComments(postId: string) {
    setExpanded((p) => ({ ...p, [postId]: !p[postId] }));
  }

  function addPost(e: FormEvent) {
    e.preventDefault();
    setComposerError(null);

    const body = composer.trim();
    if (!body) {
      setComposerError("Write something first.");
      return;
    }

    const newPost: Post = {
      id: `p_${crypto.randomUUID()}`,
      author: me,
      body,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      commentCount: 0,
    };

    setPosts((p) => [newPost, ...p]);
    setComposer("");
  }

  function addComment(postId: string, body: string) {
    const text = body.trim();
    if (!text) return;

    const newComment: Comment = {
      id: `c_${crypto.randomUUID()}`,
      postId,
      author: me,
      body: text,
      createdAt: new Date().toISOString(),
    };

    setComments((c) => [newComment, ...c]);
    setPosts((p) =>
      p.map((x) =>
        x.id === postId ? { ...x, commentCount: x.commentCount + 1 } : x,
      ),
    );
    setExpanded((p) => ({ ...p, [postId]: true }));
  }

  function like(postId: string) {
    setPosts((p) =>
      p.map((x) =>
        x.id === postId ? { ...x, likeCount: x.likeCount + 1 } : x,
      ),
    );
  }

  return (
    <div className="feedPage">
      <div className="feedGrid">
        <section className="feedMain">
          <div className="feedHeader">
            <div>
              <p className="pill">Home</p>
              <h1 className="feedTitle">Posts</h1>
              <p className="feedSub">
                A simple feed with comments. Keep it consistent.
              </p>
            </div>
          </div>

          <form className="composer" onSubmit={addPost}>
            <textarea
              className="textarea"
              placeholder="Write a post…"
              value={composer}
              onChange={(e) => setComposer(e.target.value)}
              rows={3}
            />
            <div className="composerRow">
              {composerError && (
                <div className="inlineError">{composerError}</div>
              )}
              <button className="btn btnPrimary" type="submit">
                Post
              </button>
            </div>
          </form>

          <div className="postList">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isExpanded={!!expanded[post.id]}
                allComments={comments}
                onToggleComments={() => toggleComments(post.id)}
                onLike={() => like(post.id)}
                onAddComment={(body) => addComment(post.id, body)}
              />
            ))}
          </div>
        </section>

        {/* <aside className="feedSide" aria-hidden="true">
          <div className="sidePanel">
            <div className="sideTitle">Controls</div>
            <div className="sideBody">
              <div className="sideItem">
                <div className="sideK">Auth</div>
                <div className="sideV">
                  Server-side cookie. UI reads /api/me for display.
                </div>
              </div>
              <div className="sideItem">
                <div className="sideK">Permissions</div>
                <div className="sideV">
                  Never trust storage for anything sensitive.
                </div>
              </div>
              <div className="sideItem">
                <div className="sideK">Style</div>
                <div className="sideV">Tokens only. No random colors.</div>
              </div>
            </div>
          </div>
        </aside> */}
      </div>
    </div>
  );
}

function PostCard(props: {
  post: Post;
  isExpanded: boolean;
  allComments: Comment[];
  onToggleComments: () => void;
  onLike: () => void;
  onAddComment: (body: string) => void;
}) {
  const {
    post,
    isExpanded,
    allComments,
    onToggleComments,
    onLike,
    onAddComment,
  } = props;

  const postComments = useMemo(
    () => allComments.filter((c) => c.postId === post.id),
    [allComments, post.id],
  );

  return (
    <article className="postCard">
      <header className="postTop">
        <div className="avatar" aria-hidden="true">
          {post.author.username.slice(0, 1).toUpperCase()}
        </div>
        <div className="postMeta">
          <div className="postLine">
            <span className="postAuthor">{post.author.username}</span>
            <span className="dotSep">·</span>
            <span className="postTime">{timeLabel(post.createdAt)}</span>
          </div>
        </div>
      </header>

      <div className="postBody">{post.body}</div>

      <div className="postActions">
        <button
          className="btn btnSecondary btnSm"
          type="button"
          onClick={onLike}
        >
          Like <span className="count">{post.likeCount}</span>
        </button>

        <button
          className="btn btnGhost btnSm"
          type="button"
          onClick={onToggleComments}
        >
          Comments <span className="count">{post.commentCount}</span>
        </button>
      </div>

      {isExpanded && (
        <div className="comments">
          <div className="commentsList">
            {postComments.length === 0 ? (
              <div className="empty">No comments yet.</div>
            ) : (
              postComments.map((c) => (
                <div className="comment" key={c.id}>
                  <div className="commentHead">
                    <span className="commentAuthor">{c.author.username}</span>
                    <span className="dotSep">·</span>
                    <span className="commentTime">
                      {timeLabel(c.createdAt)}
                    </span>
                  </div>
                  <div className="commentBody">{c.body}</div>
                </div>
              ))
            )}
          </div>

          <CommentForm onSubmit={onAddComment} />
        </div>
      )}
    </article>
  );
}

function CommentForm({ onSubmit }: { onSubmit: (body: string) => void }) {
  const [value, setValue] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    onSubmit(value);
    setValue("");
  }

  return (
    <form className="commentForm" onSubmit={submit}>
      <input
        className="input"
        placeholder="Write a comment…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn btnPrimary" type="submit">
        Send
      </button>
    </form>
  );
}
