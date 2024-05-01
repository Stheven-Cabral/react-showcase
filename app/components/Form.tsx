import { useState } from 'react';
import { Validatable, validate } from '../utils/validation';
import { toLowerKebabCase, idGenerator } from '../utils/formatter';

type FormProps = {
  onFormInput: (projectData: Record<string, FormDataEntryValue | null>) => void;
};

export function Form({ onFormInput }: FormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [people, setPeople] = useState('');

  function validateInputs(
    title: FormDataEntryValue | null,
    description: FormDataEntryValue | null,
    people: FormDataEntryValue | null
  ) {
    const enteredTitle = title;
    const enteredDescription = description;
    const enteredPeople = people;
    const enteredId = `${title}-${people}`;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople!,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again!');
      return undefined;
    } else {
      return { enteredTitle, enteredDescription, enteredPeople, enteredId };
    }
  }

  async function addProject(formData: FormData) {
    const inputTitle = formData.get('title');
    const inputDescription = formData.get('description');
    const inputPeople = formData.get('people');

    const validatedInputs = validateInputs(
      inputTitle,
      inputDescription,
      inputPeople
    );
    if (!!validatedInputs) {
      const {
        enteredTitle: title,
        enteredDescription: description,
        enteredPeople: people,
      } = validatedInputs;
      const projectData = {
        title,
        description,
        people,
        id: `${toLowerKebabCase(title as string)}-${people}-${idGenerator()}`,
      };

      onFormInput(projectData);

      setTitle('');
      setDescription('');
      setPeople('');
    }
  }

  return (
    <section id="project-input">
      <form
        action={addProject}
        className="bg-gray-200 pt-1 p-5 border-2 rounded border-blue-900"
      >
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={3}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="people">People</label>
          <input
            type="number"
            id="people"
            step="1"
            min="0"
            max="10"
            name="people"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </div>
        <button type="submit">ADD PROJECT</button>
      </form>
    </section>
  );
}
