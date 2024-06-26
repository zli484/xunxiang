export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      TempMember: {
        Row: {
          bio: string | null;
          careerGoal: string | null;
          careerGoalEng: string | null;
          email: string | null;
          graduationYear: number | null;
          hometown: string | null;
          hometownEng: string | null;
          interests: string | null;
          interestsEng: string | null;
          joinedDate: string | null;
          linkedInLink: string | null;
          major: string | null;
          majorEng: string | null;
          memberId: number | null;
          name: string;
          nameEng: string | null;
          school: string | null;
          userId: number;
        };
        Insert: {
          bio?: string | null;
          careerGoal?: string | null;
          careerGoalEng?: string | null;
          email?: string | null;
          graduationYear?: number | null;
          hometown?: string | null;
          hometownEng?: string | null;
          interests?: string | null;
          interestsEng?: string | null;
          joinedDate?: string | null;
          linkedInLink?: string | null;
          major?: string | null;
          majorEng?: string | null;
          memberId?: number | null;
          name: string;
          nameEng?: string | null;
          school?: string | null;
          userId?: number;
        };
        Update: {
          bio?: string | null;
          careerGoal?: string | null;
          careerGoalEng?: string | null;
          email?: string | null;
          graduationYear?: number | null;
          hometown?: string | null;
          hometownEng?: string | null;
          interests?: string | null;
          interestsEng?: string | null;
          joinedDate?: string | null;
          linkedInLink?: string | null;
          major?: string | null;
          majorEng?: string | null;
          memberId?: number | null;
          name?: string;
          nameEng?: string | null;
          school?: string | null;
          userId?: number;
        };
        Relationships: [];
      };
      User: {
        Row: {
          bio: string | null;
          bioEmbedding: string | null;
          careerGoal: string | null;
          careerGoalEmbedding: string | null;
          careerGoalEng: string | null;
          email: string | null;
          gender: string | null;
          graduationYear: number | null;
          hometown: string | null;
          hometownEng: string | null;
          interestEmbedding: string | null;
          interests: string | null;
          interestsEng: string | null;
          joinedDate: string | null;
          linkedInLink: string | null;
          major: string | null;
          majorEng: string | null;
          memberId: number | null;
          name: string;
          nameEng: string | null;
          profilePictureURL: string | null;
          school: string | null;
          userId: number;
        };
        Insert: {
          bio?: string | null;
          bioEmbedding?: string | null;
          careerGoal?: string | null;
          careerGoalEmbedding?: string | null;
          careerGoalEng?: string | null;
          email?: string | null;
          gender?: string | null;
          graduationYear?: number | null;
          hometown?: string | null;
          hometownEng?: string | null;
          interestEmbedding?: string | null;
          interests?: string | null;
          interestsEng?: string | null;
          joinedDate?: string | null;
          linkedInLink?: string | null;
          major?: string | null;
          majorEng?: string | null;
          memberId?: number | null;
          name: string;
          nameEng?: string | null;
          profilePictureURL?: string | null;
          school?: string | null;
          userId?: number;
        };
        Update: {
          bio?: string | null;
          bioEmbedding?: string | null;
          careerGoal?: string | null;
          careerGoalEmbedding?: string | null;
          careerGoalEng?: string | null;
          email?: string | null;
          gender?: string | null;
          graduationYear?: number | null;
          hometown?: string | null;
          hometownEng?: string | null;
          interestEmbedding?: string | null;
          interests?: string | null;
          interestsEng?: string | null;
          joinedDate?: string | null;
          linkedInLink?: string | null;
          major?: string | null;
          majorEng?: string | null;
          memberId?: number | null;
          name?: string;
          nameEng?: string | null;
          profilePictureURL?: string | null;
          school?: string | null;
          userId?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
