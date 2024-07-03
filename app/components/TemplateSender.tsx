import { FC, useState } from 'react';

interface TemplateSenderProps {
  onSendTemplate: (templateName: string) => void;
  templates: Array<{ name: string; category: string }>;
}

const TemplateSender: FC<TemplateSenderProps> = ({
  onSendTemplate,
  templates,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTemplate) {
      onSendTemplate(selectedTemplate);
      setSelectedTemplate('');
    }
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
