export interface AdminUserListItem {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'superadmin';
  status: 'active' | 'suspended' | 'pending';
  familyGroupsCount: number;
  walletsCount: number;
  lastLoginAt?: string;
  createdAt: string;
}

export interface SystemPlan {
  id: string;
  name: string;
  code: string;
  priceInCents: number;
  currency: string;
  billingInterval: 'monthly' | 'yearly';
  features: string[];
  isActive: boolean;
}

export interface SystemSubscription {
  id: string;
  userId: string;
  userName: string;
  planId: string;
  planName: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface AuditLogItem {
  id: string;
  actorId: string;
  actorEmail: string;
  action: string;
  targetType: string;
  targetId: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}
