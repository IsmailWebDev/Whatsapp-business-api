import { FC, useState } from 'react';
import { registerTemplate } from '@/app/lib/whatsappApi';

interface TemplateManagerProps {
  onTemplateRegistered: () => void;
  templates: Array<{ name: string; category: string }>;
}

type TemplateCategory = 'MARKETING' | 'UTILITY';

const TemplateManager: FC<TemplateManagerProps> = ({
  onTemplateRegistered,
}) => {
  const [templateName, setTemplateName] = useState('');
  const [templateBody, setTemplateBody] = useState('');
  const [category, setCategory] =
    useState<TemplateCategory>('UTILITY');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (templateName.trim() && templateBody.trim()) {
      setIsRegistering(true);
      setError('');
      try {
        await registerTemplate(
          templateName,
          [
            {
              type: 'BODY',
              text: templateBody,
            },
          ],
          category
        );
        onTemplateRegistered();
        setTemplateName('');
        setTemplateBody('');
        setCategory('UTILITY');
      } catch (error) {
        setError('Failed to register template. Please try again.');
        console.error('Failed to register template:', error);
      } finally {
        setIsRegistering(false);
      }
    }
  };

  return (
    <div className="p-4 border-b">
      <h2 className="text-xl font-bold mb-4">Template Manager</h2>
      <h3 className="text-lg font-semibold mb-2">
        Register New Template
      </h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-2"
      >
        <input
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Template Name"
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
        />
        <textarea
          value={templateBody}
          onChange={(e) => setTemplateBody(e.target.value)}
          placeholder="Template Body"
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
          rows={4}
        />
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as TemplateCategory)
          }
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
        >
          <option value="MARKETING">Marketing</option>
          <option value="UTILITY">Utility</option>
        </select>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={isRegistering}
          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
        >
          {isRegistering ? 'Registering...' : 'Register Template'}
        </button>
      </form>
    </div>
  );
};

export default TemplateManager;
