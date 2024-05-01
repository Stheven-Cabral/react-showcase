type DoneProjectListProps = {
  projects: Record<string, string | number>[];
  onProjectDrop: (projectId: string) => void;
};

export default function DoneProjectList({
  projects = [],
  onProjectDrop,
}: DoneProjectListProps) {
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
      className='done-projects min-h-52'
      onDragOver={allowDrop}
      onDrop={onDropHandler}
    >
      <header className="done-projects__header">
        <h2 className="text-xl">Done Projects</h2>
      </header>
      <ul className="done-projects__list">
        {projects &&
          projects.map((project: any) => {
            return (
              <li
                id={project.id}
                key={project.id}
                className="done-projects__project"
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
  );
}
