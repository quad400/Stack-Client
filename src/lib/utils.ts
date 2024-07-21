import { type ClassValue, clsx } from "clsx";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import { IList } from "./interfaces";
import { CardDispatch, ListDispatch } from "@/features/workspaceSlice";
import { AppDispatch } from "@/features/store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);
  return { files, displayUrl };
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export const onDragEnd = async (
  result: any,
  lists: IList[],
  dispatch: AppDispatch
) => {
  const { destination, source, type } = result;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  if (type === "list") {
    const items = reorder(lists, source.index, destination.index).map(
      (list, index) => ({ ...list, order: index })
    );

    dispatch(ListDispatch(items));
  }

  // User move card
  if (type === "card") {
    let newLists = lists.map((list) => {
      if (list._id === source.droppableId) {
        const newCards = Array.from(list.cards);
        newCards.splice(source.index, 1);
        return {
          ...list,
          cards: newCards,
        };
      }
      return list;
    });

    newLists = newLists.map((list) => {
      if (list._id === destination.droppableId) {
        const newCards = Array.from(list.cards);
        // @ts-ignore
        const movedCard = lists.find((list) => list._id === source.droppableId)
          .cards[source.index];
        newCards.splice(destination.index, 0, {
          ...movedCard,
          order: destination.index,
        });
        return {
          ...list,
          cards: newCards,
        };
      }
      return list;
    });

    dispatch(CardDispatch(newLists));
  }
};



export function dateFormater(date: Date | null) {
  
  if (date === null) {
    return "-";
  }
  
  // Parse the ISO string into a Date object
  const parsedDate = new Date(date);

  // Check if the date is valid
  if (isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  const now = new Date();
  const s = Math.abs(now.getTime() - parsedDate.getTime()) / 1000;

  if (s < 60) {
    return "now";
  }
  // Minutes
  if (s < 60 * 60) {
    const m = Math.floor(s / 60);
    return `${m}min ago`;
  }
  // Hours
  if (s < 60 * 60 * 24) {
    const h = Math.floor(s / (60 * 60));
    return `${h}hr ago`;
  }
  // Days
  if (s < 60 * 60 * 24 * 7) {
    const d = Math.floor(s / (60 * 60 * 24));
    return `${d}day ago`;
  }
  // Weeks
  if (s < 60 * 60 * 24 * 7 * 4) {
    const w = Math.floor(s / (60 * 60 * 24 * 7));
    return `${w}w ago`;
  }
  // Months
  if (s < 60 * 60 * 24 * 7 * 4 * 12) {
    const months = Math.floor(s / (60 * 60 * 24 * 7 * 4));
    return `${months}months ago`;
  }
  // Years
  const y = Math.floor(s / (60 * 60 * 24 * 365));
  return `${y}year ago`;
}