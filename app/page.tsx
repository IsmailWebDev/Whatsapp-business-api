'use client';
import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import MessageList from '@/app/components/MessageList';
import MessageInput from '@/app/components/MessageInput';
import TemplateManager from '@/app/components/TemplateManager';
import TemplateSender from '@/app/components/TemplateSender';
import RecipientManager from '@/app/components/RecipientManager';
import {
  fetchMessages,
  sendMessage,
  sendTemplate,
  fetchTemplates,
} from '@/app/lib/whatsappApi';

interface Recipient {
  id: string;
  phoneNumber: string;
  name: string;
}

export default function Home() {
  const queryClient = useQueryClient();
  const [selectedRecipients, setSelectedRecipients] = useState<
    string[]
  >([]);
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  const { data: messages = [] } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
    refetchInterval: 1000,
    staleTime: 0,
  });

  const { data: templates = [], refetch: refetchTemplates } =
    useQuery({
      queryKey: ['templates'],
      queryFn: fetchTemplates,
    });

  const sendMessageMutation = useMutation({
    mutationFn: (text: string) =>
      Promise.all(
        selectedRecipients.map((recipient) =>
          sendMessage(recipient, text)
        )
      ),
    onSuccess: (responseData, sentText) => {
      queryClient.setQueryData(
        ['messages'],
        (oldMessages: any[] = []) => [
          ...oldMessages,
          ...responseData.map((response) => ({
            text: sentText,
            ...response,
          })),
        ]
      );
    },
  });

  const sendTemplateMutation = useMutation({
    mutationFn: ({ templateName }: { templateName: string }) =>
      Promise.all(
        selectedRecipients.map((recipient) =>
          sendTemplate(recipient, templateName)
        )
      ),
    onSuccess: (responseData, { templateName }) => {
      queryClient.setQueryData(
        ['messages'],
        (oldMessages: any[] = []) => [
          ...oldMessages,
          ...responseData.map((response) => ({
            text: `Template: ${templateName}`,
            ...response,
          })),
        ]
      );
    },
  });

  const handleSendMessage = (text: string) => {
    if (selectedRecipients.length > 0) {
      sendMessageMutation.mutate(text);
    } else {
      alert('Please select at least one recipient.');
    }
  };

  const handleSendTemplate = (templateName: string) => {
    if (selectedRecipients.length > 0) {
      sendTemplateMutation.mutate({ templateName });
    } else {
      alert('Please select at least one recipient.');
    }
  };

  const handleTemplateRegistered = () => {
    refetchTemplates();
  };

  const handleAddRecipient = (newRecipient: Recipient) => {
    setRecipients([...recipients, newRecipient]);
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold p-4">WhatsApp Messages</h1>
      <RecipientManager
        recipients={recipients}
        onAddRecipient={handleAddRecipient}
        onSelectRecipients={setSelectedRecipients}
        selectedRecipients={selectedRecipients}
      />
      <TemplateManager
        onTemplateRegistered={handleTemplateRegistered}
        templates={templates}
      />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
      <TemplateSender
        onSendTemplate={handleSendTemplate}
        templates={templates}
      />
    </div>
  );
}
