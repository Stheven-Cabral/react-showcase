'use client';
import { useState } from 'react';
import { Form } from './components/Form';
import ProjectList from './components/ProjectList';

export default function Home() {
  const [activeProjects, updateActiveProjects] = useState<
    Record<string, string | number>[]
  >([]);
  const [doneProjects, updateDoneProjects] = useState<
    Record<string, string | number>[]
  >([]);

  const formCallback = (projectData: any) => {
    updateActiveProjects([...activeProjects, projectData]);
  };

  const updateActiveProjectsCallback = (id: string) => {
    console.log('test');
  };

  const updateDoneProjectsCallback = (id: string) => {
    const droppedProject = activeProjects.find((project) => project.id === id);

    console.log(droppedProject);
  };
  return (
    <>
      <div>
        <h1 className="text-2xl mb-3">Project Manager Tool</h1>
      </div>
      <Form onFormInput={formCallback} />
      <ProjectList
        projects={activeProjects}
        title="Active Projects"
        listType="active"
        onProjectDrop={updateActiveProjectsCallback}
      />
      <ProjectList
        projects={doneProjects}
        title="Finished Projects"
        listType="finished"
        onProjectDrop={updateDoneProjectsCallback}
      />
    </>
  );
}
