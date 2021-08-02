import React from "react";

export interface ITaskItem {
  _id: string;
  title: string;
  description: string;
}

export type ApiDataType = {
    message: string
    status: string
    data: ITaskItem[]
    statusText: string
    headers: any
    config: any
}
