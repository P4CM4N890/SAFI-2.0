
export interface Notificacion {
    id: string;
    title: string;
    datetime: Date;
    annotations: string;
    iconColor: string;
    iconName: string;
    isActive: boolean;
}

export interface NotificationCardProps {
    id: string;
    title: string;
    iconName: string;
    iconColor: string;
    datetime: Date;
    isActive: boolean;
    prevActive?: boolean;
    toggleSwitch?: Function;
    deleteNotification?: Function;
    updateNotification?: Function;
}
