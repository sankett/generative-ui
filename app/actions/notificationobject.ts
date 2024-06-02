import { z } from 'zod';
import { DeepPartial } from 'ai';
export const NotificationSchema = z.object({
    notifications: 
      z.object({       
        label: z.string(),
        months: z.array(z.string()),
        rates:  z.array(z.number()),
      })
    
  })

  export type PartialNotification = DeepPartial<typeof NotificationSchema>;