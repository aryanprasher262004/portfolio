import { PROJECTS } from "@/data/projects";
import styles from "./ProjectsContent.module.css";

/**
 * Chrome-free: works standalone inside a <Window>, and later in the
 * accessible/mobile fallback tier. Content is entirely data-driven — see
 * src/data/projects.ts.
 */
export function ProjectsContent() {
  return (
    <div className={styles.list}>
      {PROJECTS.map((project) => (
        <article key={project.id} className={styles.card}>
          <div className={styles.thumb} aria-hidden />
          <div className={styles.body}>
            <h3 className={styles.name}>{project.name}</h3>
            <p className={styles.meta}>{project.category}</p>
            <p className={styles.desc}>{project.description}</p>
            <button type="button" className={styles.link} disabled>
              VIEW PROJECT
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
