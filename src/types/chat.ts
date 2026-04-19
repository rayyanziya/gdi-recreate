export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

export interface ChatRequestBody {
  messages: ChatMessage[];
  userEmail?: string;
}

export interface EscalateRequestBody {
  messages: ChatMessage[];
  userEmail: string;
  userName?: string;
}

export interface BookingRequestBody {
  messages: ChatMessage[];
  name: string;
  email: string;
  company?: string;
  description: string;
}
