import { FC, useState } from 'react';

interface TemplateSenderProps {
  onSendTemplate: (templateName: string, parameters: any[]) => void;
  templates: Array<{ name: string; category: string }>;
}

const TemplateSender: FC<TemplateSenderProps> = ({
  onSendTemplate,
  templates,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [parameters, setParameters] = useState(['']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTemplate) {
      onSendTemplate(
        selectedTemplate,
        parameters.filter((p) => p.trim() !== '')
      );
      setSelectedTemplate('');
      setParameters(['']);
    }
  };

  const addParameter = () => {
    setParameters([...parameters, '']);
  };

  const updateParameter = (index: number, value: string) => {
    const newParameters = [...parameters];
    newParameters[index] = value;
    setParameters(newParameters);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex flex-col space-y-2">
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
        >
          <option value="">Select a template</option>
          {templates.map((template, index) => (
            <option key={index} value={template.name}>
              {template.name} - {template.category}
            </option>
          ))}
        </select>
        {selectedTemplate &&
          parameters.map((param, index) => (
            <input
              key={index}
              type="text"
              value={param}
              onChange={(e) => updateParameter(index, e.target.value)}
              placeholder={`Parameter ${index + 1}`}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
            />
          ))}
        {selectedTemplate && (
          <button
            type="button"
            onClick={addParameter}
            className="bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Add Parameter
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send Template
        </button>
      </div>
    </form>
  );
};

export default TemplateSender;
