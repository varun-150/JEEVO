
export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  sources?: GroundingChunk[];
}

export type UserRole = 'personal' | 'organization' | 'admin';

export type SubscriptionPlan = 'free' | 'basic' | 'pro' | 'pro_max' | 'ultra_pro';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    subscriptionPlan?: SubscriptionPlan;
}
