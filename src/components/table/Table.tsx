import { Table as _Table, TableProps } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  useDroppable,
  rectIntersection,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";
import { Spin } from "../spin";
import { Button } from "../button";
import paginationStyles from "../pagination/styles.module.css";
import styles from "./styles.module.css";

type TParent = {
  expandable: boolean;
};

type TTable<T> = TableProps<T> & {
  parent?: TParent;
  scrollY?: number;
  divided?: boolean;
  theme?: "dark";
  wrap?: boolean;
};

export function Table<const T extends object>(props: TTable<T>) {
  return (
    <_Table
      bordered={false}
      {...((!props?.parent?.expandable ||
        props?.parent?.expandable === undefined) && {
        scroll: !props?.scrollY
          ? {
              x: "max-content",
            }
          : {
              x: "max-content",
              y: props.scrollY,
            },
      })}
      {...props}
      className={classNames(
        styles.root,
        props.dataSource?.length && props.dataSource?.length > 0
          ? styles.overflow_auto
          : styles.overflow_hidden,
        props.divided ? "" : styles.undivided,
        props.theme == "dark" ? styles.dark : "",
        props.wrap ? styles.wrap : "",
        props.className,
      )}
    />
  );
}

type TDraggableRowTable<T> = Omit<TTable<T>, "onChange"> & {
  localStorageKey: string;
  allData: T[];
  onChange?: (previousData: T[], currentData: T[]) => void;
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
  isEmpty: boolean;
}

export function Row(props: RowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });
  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      },
    ),
    transition,
    cursor: "grab",
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 99999999,
          cursor: "grabbing",
        }
      : {}),
  };

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
}

type Writeable<T> = { -readonly [P in keyof T]-?: T[P] };

type NewType<T> = T & {
  id: string;
  file_id: string;
};

function DraggableRow<const T>(
  this: any,
  {
    dataSource,
    localStorageKey,
    onChange,
    allData,
    ...props
  }: TDraggableRowTable<NewType<T> & { key: string }>,
) {
  const [data, setData] = useState<Writeable<typeof dataSource>>([]);
  // const { setNodeRef } = useDroppable({
  //   id: localStorageKey,
  // });

  const dataSourceItems = dataSource?.map((id) => {
    return allData.find(({ id: itemId }) => itemId === id);
  });

  const sensors = useSensors(useSensor(PointerSensor));
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    console.log(active, over);
    if (active.id !== over?.id) {
      setData((prev) => {
        const activeIndex = prev!.findIndex((i) => i.key === active.id);
        const overIndex = prev!.findIndex((i) => i.key === over?.id);

        const newArray = arrayMove(prev!, activeIndex!, overIndex!);

        if (localStorageKey) {
          localStorage.setItem(localStorageKey, JSON.stringify(newArray));
        }

        if (onChange) {
          onChange(data!, newArray);
        }

        return newArray;
      });
    }
  };

  useEffect(() => {
    const storageRows =
      localStorageKey && localStorage.getItem(localStorageKey);

    if (storageRows) {
      const parsedStorageRows: NewType<T>[] = JSON.parse(storageRows);

      const sortedRows = (dataSource || [])
        .slice()
        .sort(
          (a, b) =>
            parsedStorageRows.map((item) => item?.file_id).indexOf(a.file_id) -
            parsedStorageRows.map((item) => item?.file_id).indexOf(b.file_id),
        );

      localStorage.setItem(localStorageKey, JSON.stringify(sortedRows));
      setData(sortedRows);
    } else {
      setData(dataSource!.slice());
    }
  }, [dataSource, localStorageKey]);

  const TableRender = this as typeof Table;

  const DragRow = useCallback(
    (rowProps: NewType<T> & { "data-row-key": string }) => {
      return <Row {...rowProps} isEmpty={!(data!.length > 0)} />;
    },
    [],
  );

  return (
    // <DndContext
    //   sensors={sensors}
    //   modifiers={[restrictToWindowEdges]}
    //   onDragEnd={onDragEnd}
    // >
    <SortableContext
      // rowKey array
      id={localStorageKey}
      items={data!}
      strategy={verticalListSortingStrategy}
    >
      <TableRender
        {...props}
        // tableRef={setNodeRef}
        components={{
          body: {
            row: DragRow,
          },
        }}
        rowKey="id"
        dataSource={dataSourceItems as typeof dataSource}
      />
    </SortableContext>
    // </DndContext>
  );
}

Table.DraggableRow = DraggableRow.bind(Table);
Table.SELECTION_ALL = _Table.SELECTION_ALL;
Table.SELECTION_INVERT = _Table.SELECTION_INVERT;
Table.SELECTION_NONE = _Table.SELECTION_NONE;
Table.SELECTION_COLUMN = _Table.SELECTION_COLUMN;
Table.EXPAND_COLUMN = _Table.EXPAND_COLUMN;
