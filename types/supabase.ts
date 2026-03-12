export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          body: string
          created_at: string
          cta_href: string | null
          cta_label: string | null
          expires_at: string | null
          id: string
          is_published: boolean
          publish_date: string
          title: string
          updated_at: string
        }
        Insert: {
          body: string
          created_at?: string
          cta_href?: string | null
          cta_label?: string | null
          expires_at?: string | null
          id?: string
          is_published?: boolean
          publish_date: string
          title: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          cta_href?: string | null
          cta_label?: string | null
          expires_at?: string | null
          id?: string
          is_published?: boolean
          publish_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          date: string
          description: string
          id: string
          image_url: string | null
          is_published: boolean
          location: string
          rsvp_url: string | null
          slug: string
          time: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          description: string
          id?: string
          image_url?: string | null
          is_published?: boolean
          location: string
          rsvp_url?: string | null
          slug: string
          time: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string
          id?: string
          image_url?: string | null
          is_published?: boolean
          location?: string
          rsvp_url?: string | null
          slug?: string
          time?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      homepage_sections: {
        Row: {
          body: string | null
          created_at: string
          cta_href: string | null
          cta_label: string | null
          id: string
          image_url: string | null
          is_enabled: boolean
          secondary_cta_href: string | null
          secondary_cta_label: string | null
          section_key: string
          sort_order: number
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          cta_href?: string | null
          cta_label?: string | null
          id?: string
          image_url?: string | null
          is_enabled?: boolean
          secondary_cta_href?: string | null
          secondary_cta_label?: string | null
          section_key: string
          sort_order?: number
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          cta_href?: string | null
          cta_label?: string | null
          id?: string
          image_url?: string | null
          is_enabled?: boolean
          secondary_cta_href?: string | null
          secondary_cta_label?: string | null
          section_key?: string
          sort_order?: number
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      leaders: {
        Row: {
          bio: string | null
          created_at: string
          email: string | null
          id: string
          image_url: string | null
          is_published: boolean
          name: string
          phone: string | null
          role_title: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          name: string
          phone?: string | null
          role_title: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          name?: string
          phone?: string | null
          role_title?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          alt_text: string | null
          bucket: string
          created_at: string
          file_path: string
          id: string
          mime_type: string | null
          public_url: string | null
          title: string
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          bucket?: string
          created_at?: string
          file_path: string
          id?: string
          mime_type?: string | null
          public_url?: string | null
          title: string
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          bucket?: string
          created_at?: string
          file_path?: string
          id?: string
          mime_type?: string | null
          public_url?: string | null
          title?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      navigation_items: {
        Row: {
          created_at: string
          href: string
          id: string
          is_visible: boolean
          label: string
          location: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          href: string
          id?: string
          is_visible?: boolean
          label: string
          location: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          href?: string
          id?: string
          is_visible?: boolean
          label?: string
          location?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      new_here_submissions: {
        Row: {
          created_at: string
          email: string
          household_size: number | null
          id: string
          interested_in: string[]
          name: string
          phone: string | null
          prayer_request: string | null
        }
        Insert: {
          created_at?: string
          email: string
          household_size?: number | null
          id?: string
          interested_in?: string[]
          name: string
          phone?: string | null
          prayer_request?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          household_size?: number | null
          id?: string
          interested_in?: string[]
          name?: string
          phone?: string | null
          prayer_request?: string | null
        }
        Relationships: []
      }
      page_sections: {
        Row: {
          body: string | null
          created_at: string
          cta_href: string | null
          cta_label: string | null
          id: string
          image_url: string | null
          is_enabled: boolean
          page_key: string
          secondary_cta_href: string | null
          secondary_cta_label: string | null
          section_key: string
          sort_order: number
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          cta_href?: string | null
          cta_label?: string | null
          id?: string
          image_url?: string | null
          is_enabled?: boolean
          page_key: string
          secondary_cta_href?: string | null
          secondary_cta_label?: string | null
          section_key: string
          sort_order?: number
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          cta_href?: string | null
          cta_label?: string | null
          id?: string
          image_url?: string | null
          is_enabled?: boolean
          page_key?: string
          secondary_cta_href?: string | null
          secondary_cta_label?: string | null
          section_key?: string
          sort_order?: number
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      sermons: {
        Row: {
          created_at: string
          date: string
          id: string
          is_published: boolean
          scripture: string | null
          slug: string
          speaker: string
          summary: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          youtube_url: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          is_published?: boolean
          scripture?: string | null
          slug: string
          speaker: string
          summary?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          youtube_url: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          is_published?: boolean
          scripture?: string | null
          slug?: string
          speaker?: string
          summary?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          youtube_url?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          group: string
          id: string
          key: string
          label: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          group: string
          id?: string
          key: string
          label: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          group?: string
          id?: string
          key?: string
          label?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: { user_id: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

