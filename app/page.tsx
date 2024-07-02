'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import MessageList from '@/app/components/MessageList';
import MessageInput from '@/app/components/MessageInput';
import { fetchMessages, sendMessage } from '@/app/lib/whatsappApi';

export default function Home() {
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
    refetchInterval: 1000, // Refetch every 1 second
    refetchIntervalInBackground: true, // Refetch even when the window is not focused
    staleTime: 0, // Consider data always stale
  });

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (responseData, sentText) => {
      console.log(responseData);
      queryClient.setQueryData(['messages'], (oldMessages = []) => [
        ...oldMessages,
        { text: sentText, ...responseData },
      ]);
    },
  });

  const handleSendMessage = (text) => {
    sendMessageMutation.mutate(text);
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold p-4">WhatsApp Messages</h1>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
