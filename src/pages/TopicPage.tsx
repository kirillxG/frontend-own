import { type FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../css/topics.css";

type Category = {
  id: string;
  name: string;
  description: string;
};

type Topic = {
  id: string;
  categoryId: string;
  title: string;
  preview: string;
  author: { username: string };
  replyCount: number;
  lastActivityAt: string;
};

const seedCategories: Category[] = [
  {
    id: "c1",
    name: "Announcements",
    description: "Updates, releases, policy changes.",
  },
  { id: "c2", name: "Support", description: "Help, bug reports, how-to." },
  {
    id: "c3",
    name: "General",
    description: "Discussion that doesn’t fit elsewhere.",
  },
];

const seedTopics: Topic[] = [
  {
    id: "t1",
    categoryId: "c1",
    title: "Moderation rules and enforcement workflow",
    preview: "How we handle reports, review queues, and escalation.",
    author: { username: "admin" },
    replyCount: 14,
    lastActivityAt: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
  },
  {
    id: "t2",
    categoryId: "c2",
    title: "Login issues with cookie sessions",
    preview: "Common reasons: SameSite, domain mismatch, proxy headers.",
    author: { username: "support" },
    replyCount: 6,
    lastActivityAt: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
  },
  {
    id: "t3",
    categoryId: "c3",
    title: "Feature requests: tags, mentions, and pinned posts",
    preview: "What should be first and why?",
    author: { username: "kiri" },
    replyCount: 31,
    lastActivityAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
];

function timeLabel(iso: string) {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "" : d.toLocaleString();
}

export default function TopicsPage() {
  const [categories] = useState<Category[]>(seedCategories);
  const [topics, setTopics] = useState<Topic[]>(seedTopics);

  const [activeCategoryId, setActiveCategoryId] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"activity" | "replies">("activity");

  // lightweight “new topic” UI (client-side only)
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = topics.slice();

    if (activeCategoryId !== "all") {
      list = list.filter((t) => t.categoryId === activeCategoryId);
    }

    if (q) {
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.preview.toLowerCase().includes(q) ||
          t.author.username.toLowerCase().includes(q),
      );
    }

    if (sort === "replies") {
      list.sort((a, b) => b.replyCount - a.replyCount);
    } else {
      list.sort(
        (a, b) => +new Date(b.lastActivityAt) - +new Date(a.lastActivityAt),
      );
    }

    return list;
  }, [topics, activeCategoryId, query, sort]);

  function createTopic(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    const t = title.trim();
    const p = preview.trim();

    if (!t || !p) {
      setFormError("Title and short text are required.");
      return;
    }
    if (activeCategoryId === "all") {
      setFormError("Pick a category first.");
      return;
    }

    const newTopic: Topic = {
      id: `t_${crypto.randomUUID()}`,
      categoryId: activeCategoryId,
      title: t,
      preview: p,
      author: { username: "you" },
      replyCount: 0,
      lastActivityAt: new Date().toISOString(),
    };

    setTopics((prev) => [newTopic, ...prev]);
    setTitle("");
    setPreview("");
  }

  return (
    <div className="topicsPage">
      <div className="topicsMain">
        <header className="topicsHeader">
          <div>
            <p className="pill">Forum</p>
            <h1 className="topicsTitle">Topics</h1>
            <p className="topicsSub">
              Categories and discussions, like a normal forum. Shocking.
            </p>
          </div>

          <div className="topicsControls">
            <input
              className="input topicsSearch"
              placeholder="Search topics, authors…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <select
              className="select"
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              aria-label="Sort topics"
            >
              <option value="activity">Sort: recent activity</option>
              <option value="replies">Sort: most replies</option>
            </select>
          </div>
        </header>

        <section className="categoryBar" aria-label="Categories">
          <button
            type="button"
            className={`chip ${activeCategoryId === "all" ? "chipActive" : ""}`}
            onClick={() => setActiveCategoryId("all")}
          >
            All
          </button>

          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`chip ${activeCategoryId === c.id ? "chipActive" : ""}`}
              onClick={() => setActiveCategoryId(c.id)}
              title={c.description}
            >
              {c.name}
            </button>
          ))}
        </section>

        <section className="newTopic">
          <div className="newTopicTop">
            <div>
              <div className="newTopicTitle">Create topic</div>
              <div className="newTopicHint">
                Pick a category, write a title, add a short description.
              </div>
            </div>

            <div className="newTopicMeta">
              {activeCategoryId === "all" ? (
                <span className="muted">Category: none</span>
              ) : (
                <span className="muted">
                  Category:{" "}
                  {categories.find((c) => c.id === activeCategoryId)?.name}
                </span>
              )}
            </div>
          </div>

          {formError && (
            <div className="authError" role="alert">
              {formError}
            </div>
          )}

          <form className="newTopicForm" onSubmit={createTopic}>
            <input
              className="input"
              placeholder="Topic title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="input"
              placeholder="Short text / preview"
              value={preview}
              onChange={(e) => setPreview(e.target.value)}
            />
            <button className="btn btnPrimary" type="submit">
              Create
            </button>
          </form>
        </section>

        <section className="topicsList" aria-label="Topic list">
          {filtered.length === 0 ? (
            <div className="topicsEmpty">No topics match your filters.</div>
          ) : (
            filtered.map((t) => (
              <article className="topicRow" key={t.id}>
                <div className="topicLeft">
                  <Link className="topicTitle" to={`/topics/${t.id}`}>
                    {t.title}
                  </Link>
                  <div className="topicPreview">{t.preview}</div>

                  <div className="topicMeta">
                    <span className="muted">by</span>{" "}
                    <span className="topicAuthor">{t.author.username}</span>
                    <span className="dotSep">·</span>
                    <span className="muted">{timeLabel(t.lastActivityAt)}</span>
                  </div>
                </div>

                <div className="topicRight">
                  <div className="statPill" title="Replies">
                    {t.replyCount} replies
                  </div>
                  <div className="statPill subtle" title="Category">
                    {categories.find((c) => c.id === t.categoryId)?.name}
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
