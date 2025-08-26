import { useQuery , useMutation, useQueryClient } from "@tanstack/react-query";
import { Notification } from "../../../models/notificationModel/notificationModel";
import { NotificationUser } from "../../../models/notificationModel/notificationModel";
import API from "../axios";

export const fetchNotification = async(userId : any) => {
    const response = await API.get(`/api/notification?userId=${userId}`);
    const notificationResponse = response.data;
    return notificationResponse.data;
}

export const insertNotification = async(notification: Notification , userId: any) => {
    const response = await API.post(`/api/notification?userId=${userId}`, notification);
    return response.data;
}

export const updateStatusNotification = async(id_notification: any) => {
    const response = await API.put(`/api/notification/${id_notification}`);
    return response.data;
}

export const updateLastSeenNotification = async() => {
    const response = await API.put(`/api/notification`);
    return response.data;
}

export const countNotificationUnread = async() => {
    const response = await API.get(`/api/notification/count`);
    return response.data;
}

// ----------------------------------------------------- custom hook to call data from API ------------------------------------------------------------------------

export const useFetchNotification = (userId : any) => {
    return useQuery({
        queryKey : ["notification"],
        queryFn:() =>fetchNotification(userId),
        enabled: !!userId       
    });
};

export const useInsertNotification = (userId : any) => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn:(notification :any) => insertNotification (notification, userId ),
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notification"] });
        },
    })
}

export const useUpdateNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (id_notification : any) => updateStatusNotification(id_notification),
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notification"] });
        }
    })
}
export const useUpdateLastSeenNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:() => updateLastSeenNotification(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notification"] });
        }
    });
}

export const useFetchCountNotificationUnread = () => {
    return useQuery({
        queryKey: ["notification"],
        queryFn: () => countNotificationUnread(),
    });
};