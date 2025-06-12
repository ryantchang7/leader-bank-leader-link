export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accelerator_applications: {
        Row: {
          accelerator_id: string
          application_data: Json
          company_stage: string
          founder_email: string
          founder_name: string
          founder_phone: string | null
          id: string
          industry: string
          notes: string | null
          reviewed_at: string | null
          startup_name: string
          status: string | null
          submitted_at: string | null
        }
        Insert: {
          accelerator_id: string
          application_data: Json
          company_stage: string
          founder_email: string
          founder_name: string
          founder_phone?: string | null
          id?: string
          industry: string
          notes?: string | null
          reviewed_at?: string | null
          startup_name: string
          status?: string | null
          submitted_at?: string | null
        }
        Update: {
          accelerator_id?: string
          application_data?: Json
          company_stage?: string
          founder_email?: string
          founder_name?: string
          founder_phone?: string | null
          id?: string
          industry?: string
          notes?: string | null
          reviewed_at?: string | null
          startup_name?: string
          status?: string | null
          submitted_at?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      investor_profiles: {
        Row: {
          added_by: string | null
          bio: string | null
          created_at: string | null
          email: string
          firm: string
          focus_areas: string[]
          id: string
          investment_range: string
          linkedin_url: string | null
          location: string | null
          name: string
          phone: string | null
          preferred_stages: string[]
          status: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          added_by?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          firm: string
          focus_areas?: string[]
          id?: string
          investment_range: string
          linkedin_url?: string | null
          location?: string | null
          name: string
          phone?: string | null
          preferred_stages?: string[]
          status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          added_by?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          firm?: string
          focus_areas?: string[]
          id?: string
          investment_range?: string
          linkedin_url?: string | null
          location?: string | null
          name?: string
          phone?: string | null
          preferred_stages?: string[]
          status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      submissions: {
        Row: {
          borrower_name: string
          business_description: string | null
          business_stage: string
          company_hq: string
          contact_email: string
          contact_name: string
          contact_phone: string | null
          current_revenue: string | null
          distributed_at: string | null
          funding_purpose: string | null
          growth_metrics: Json | null
          id: string
          industry: string
          investor_matches: number | null
          notes: string | null
          previous_funding: string | null
          priority: string | null
          raise_amount: string | null
          reviewed_at: string | null
          seeking_type: string
          status: string | null
          submitted_at: string | null
          team_size: number | null
          vertical: string | null
        }
        Insert: {
          borrower_name: string
          business_description?: string | null
          business_stage: string
          company_hq: string
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          current_revenue?: string | null
          distributed_at?: string | null
          funding_purpose?: string | null
          growth_metrics?: Json | null
          id?: string
          industry: string
          investor_matches?: number | null
          notes?: string | null
          previous_funding?: string | null
          priority?: string | null
          raise_amount?: string | null
          reviewed_at?: string | null
          seeking_type: string
          status?: string | null
          submitted_at?: string | null
          team_size?: number | null
          vertical?: string | null
        }
        Update: {
          borrower_name?: string
          business_description?: string | null
          business_stage?: string
          company_hq?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          current_revenue?: string | null
          distributed_at?: string | null
          funding_purpose?: string | null
          growth_metrics?: Json | null
          id?: string
          industry?: string
          investor_matches?: number | null
          notes?: string | null
          previous_funding?: string | null
          priority?: string | null
          raise_amount?: string | null
          reviewed_at?: string | null
          seeking_type?: string
          status?: string | null
          submitted_at?: string | null
          team_size?: number | null
          vertical?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
