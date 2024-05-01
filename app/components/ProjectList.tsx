type ProjectListProps = {
  title: string;
  projects: Record<string, string | number>[];
  listType: 'active' | 'finished';
  onProjectDrop: (projectId: string) => void;
};

export default function ProjectList({
  title,
  projects = [],
  listType,
  onProjectDrop,
}: ProjectListProps) {
  function onDragStartHandler(e: any) {
    e.dataTransfer.setData('project', e.target.id);
  }

  function allowDrop(e: any) {
    e.preventDefault();
  }

  function onDropHandler(e: any) {
    e.preventDefault();
    const droppedProjectId = e.dataTransfer.getData('project');
    onProjectDrop(droppedProjectId);
  }

  return (
    <div
      id="project-list"
      className={
        'project-list min-h-52' +
        (!!listType ? ` project-list--${listType}` : '')
      }
      onDragOver={allowDrop}
      onDrop={onDropHandler}
    >
      <div className="projects">
        <header>
          <h2 className="text-xl">{title}</h2>
        </header>
        <ul>
          {projects &&
            projects.map((project: any) => {
              return (
                <li
                  id={project.id}
                  key={project.id}
                  className="project"
                  draggable="true"
                  onDragStart={onDragStartHandler}
                >
                  <div>{project.title}</div>
                  <div>{project.description}</div>
                  <div>{project.people}</div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
