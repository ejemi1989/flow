import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';

interface MondayData {
  boards?: { name: string; items: Array<{ name: string; column_values: Array<{ title: string; text: string }> }> }[];
}

interface GmailData {
  success: boolean;
  message?: string;
}

interface SalesforceData {
  success: boolean;
  message?: string;
}

interface ZapierData {
  success: boolean;
}

interface ApiState {
  monday: {
    loading: boolean;
    error: string | null;
    data: MondayData | null;
  };
  gmail: {
    loading: boolean;
    error: string | null;
    data: GmailData | null;
  };
  salesforce: {
    loading: boolean;
    error: string | null;
    data: SalesforceData | null;
  };
  zapier: {
    loading: boolean;
    error: string | null;
    data: ZapierData | null;
  };
}

const initialState: ApiState = {
  monday: { loading: false, error: null, data: null },
  gmail: { loading: false, error: null, data: null },
  salesforce: { loading: false, error: null, data: null },
  zapier: { loading: false, error: null, data: null },
};

// Monday.com API actions
export const fetchMondayData = createAsyncThunk(
  'api/fetchMondayData',
  async ({ apiKey, boardId }: { apiKey: string; boardId: string }) => {
    console.log('Fetching Monday.com data:', { boardId });
    try {
      const response = await fetch('https://api.monday.com/v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey
        },
        body: JSON.stringify({
          query: `query { boards (ids: ${boardId}) { name items { name column_values { title text } } } }`
        })
      });
      
      if (!response.ok) {
        throw new Error(`Monday.com API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Monday.com API error:', error);
      throw error;
    }
  }
);

// Gmail API actions
export const fetchGmailData = createAsyncThunk(
  'api/fetchGmailData',
  async (webhookUrl: string) => {
    console.log('Fetching Gmail data from webhook:', webhookUrl);
    try {
      if (!webhookUrl.startsWith('http')) {
        throw new Error('Invalid webhook URL');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          event: 'test_connection'
        })
      });

      if (!response.ok) {
        throw new Error(`Gmail webhook error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Gmail webhook error:', error);
      throw error;
    }
  }
);

// Salesforce API actions
export const fetchSalesforceData = createAsyncThunk(
  'api/fetchSalesforceData',
  async (webhookUrl: string) => {
    console.log('Fetching Salesforce data from webhook:', webhookUrl);
    try {
      if (!webhookUrl.startsWith('http')) {
        throw new Error('Invalid webhook URL');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          event: 'test_connection'
        })
      });

      if (!response.ok) {
        throw new Error(`Salesforce webhook error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Salesforce webhook error:', error);
      throw error;
    }
  }
);

// Zapier API actions
export const triggerZapierWebhook = createAsyncThunk(
  'api/triggerZapierWebhook',
  async (webhookUrl: string) => {
    console.log('Triggering Zapier webhook:', webhookUrl);
    try {
      if (!webhookUrl.startsWith('https://hooks.zapier.com')) {
        throw new Error('Invalid Zapier webhook URL');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
        }),
      });

      if (!response.ok) {
        throw new Error(`Zapier webhook error: ${response.status}`);
      }

      return { success: true } as ZapierData;
    } catch (error) {
      console.error('Zapier webhook error:', error);
      throw error;
    }
  }
);

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    clearApiErrors: (state) => {
      state.monday.error = null;
      state.gmail.error = null;
      state.salesforce.error = null;
      state.zapier.error = null;
    },
  },
  extraReducers: (builder) => {
    // Monday.com
    builder
      .addCase(fetchMondayData.pending, (state) => {
        state.monday.loading = true;
        state.monday.error = null;
      })
      .addCase(fetchMondayData.fulfilled, (state, action) => {
        state.monday.loading = false;
        state.monday.data = action.payload;
        toast.success('Monday.com data fetched successfully');
      })
      .addCase(fetchMondayData.rejected, (state, action) => {
        state.monday.loading = false;
        state.monday.error = action.error.message || 'Failed to fetch Monday.com data';
        toast.error(state.monday.error);
      })
      // Add other cases for Gmail, Salesforce, and Zapier similarly
  },
});

export const { clearApiErrors } = apiSlice.actions;
export default apiSlice.reducer;