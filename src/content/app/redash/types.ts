// クエリ一覧
export interface QueriesResponse {
  count: number;
  page: number;
  page_size: number;
  results: QuerySummary[];
}
interface QueryUser {
  auth_type: string;
  is_disabled: boolean;
  updated_at: string;
  profile_image_url: string;
  is_invitation_pending: boolean;
  groups: number[];
  id: number;
  name: string;
  created_at: string;
  disabled_at: string | null;
  is_email_verified: boolean;
  active_at: string;
  email: string;
}

interface QuerySummary {
  is_archived: boolean;
  retrieved_at: string;
  updated_at: string;
  is_favorite: boolean;
  query: string;
  id: number;
  description: string | null;
  last_modified_by_id: number;
  tags: string[];
  version: number;
  query_hash: string;
  api_key: string;
  data_source_id: number;
  is_safe: boolean;
  latest_query_data_id: number;
  schedule: string | null;
  user: QueryUser;
  is_draft: boolean;
  name: string;
  created_at: string;
  runtime: number;
  options: {
    parameters: any[]; // 型が不明な場合は `any[]` を使用
  };
}

// クエリ結果
export interface QueryResultResponse {
  query_result: QueryResult;
}

interface QueryResult {
  retrieved_at: string;
  query_hash: string;
  query: string;
  runtime: number;
  data: {
    rows: Record<string, unknown>[];
    columns: {
      friendly_name: string;
      type: string;
      name: string;
    }[];
  };
  id: number;
  data_source_id: number;
}
