import { Avatar, Row, Col, Button, Badge, Space } from "antd";
import {
  EyeOutlined,
  MessageOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import clsx from "classnames";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  closestCorners,
  DragOverlay,
  rectIntersection,
  useDroppable,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Table, Row as RowItem } from "@/components/table";
import { useState } from "react";
import styles from "./styles.module.css";

const table1 = [
  {
    id: "table1-1",
    file_id: "table1-1",
    key: "table1-1",
    name: "table1-1",
  },
  {
    id: "table1-2",
    file_id: "table1-2",
    key: "table1-2",
    name: "table1-2",
  },
];

const table2 = [
  {
    id: "table2-1",
    file_id: "table2-1",
    key: "table2-1",
    name: "table2-1",
  },
  {
    id: "table2-2",
    file_id: "table2-2",
    key: "table2-2",
    name: "table2-2",
  },
  {
    id: "table2-3",
    file_id: "table2-3",
    key: "table2-3",
    name: "table2-3",
  },
];

const table3 = [
  {
    id: "table3-1",
    file_id: "table3-1",
    key: "table3-1",
    name: "table3-1",
  },
];

const columns = [
  {
    title: "name",
    key: "name",
    dataIndex: "name",
    render: (val) => val || "",
  },
];

export function Item(props: {
  id?: string;
  data: { id?: string; name?: string };
  items?: { [key: string]: string[] };
}) {
  const { id, data, items } = props;

  for (const container of Object.keys(items || {})) {
    if (container === "container3" && items?.[container].includes(id || "")) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="96"
          viewBox="0 0 48 96"
          fill="none"
        >
          <g clip-path="url(#clip0_1845_26893)">
            <rect width="48" height="96" rx="12" fill="white" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 12C0 5.37258 5.37258 0 12 0H36C42.6274 0 48 5.37258 48 12V84C48 90.6274 42.6274 96 36 96H12C5.37258 96 0 90.6274 0 84V12ZM29 19.5L42 7.49999V17.5L29 29.5V19.5ZM42 37.5L29 49.5V59.5L42 47.5V37.5ZM29 79.5L42 67.5V77.5L29 89.5V79.5ZM6 7.49999L19 19.5V29.5L6 17.5V7.49999ZM19 49.5L6 37.5V47.5L19 59.5V49.5ZM6 67.5L19 79.5V89.5L6 77.5V67.5Z"
              fill="#242424"
            />
          </g>
          <defs>
            <clipPath id="clip0_1845_26893">
              <rect width="48" height="96" rx="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    }
  }

  return (
    <>
      <td className="ant-table-cell">drag</td>
      <td className="ant-table-cell">{data?.id || ""}</td>
      <td className="ant-table-cell">{data?.name || ""}</td>
    </>
  );
}

export const FieldItem = (props) => {
  const { id, item, dragOverlay } = props;
  const {
    setNodeRef,
    listeners,
    isDragging,
    transform,
    transition,
    attributes,
  } = useSortable({
    id: id,
    disabled: props.disabled,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    borderRadius: 13,
    width: "100%",
    height: "100%",
    opacity: isDragging ? 0.5 : 1,
    boxShadow:
      isDragging || dragOverlay
        ? "0 0 0 calc(1px / 1) rgba(63, 63, 68, 0.05), -1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)"
        : "",
    border:
      isDragging || dragOverlay ? "6px solid #0093D680" : "1px solid #dcdcdc", // 1px solid rgba(64, 150, 255, 1)
    cursor: isDragging || dragOverlay ? "grabbing" : "grab",
    //transform: dragOverlay ? 'rotate(0deg) scale(1.02)' : 'rotate(0deg) scale(1.0)'
    touchAction:
      typeof window !== "undefined" &&
      (window.PointerEvent ||
        "ontouchstart" in window ||
        navigator.MaxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0)
        ? "manipulation"
        : "none",
  };
  return (
    <div
      ref={props.disabled ? null : setNodeRef}
      className="card"
      style={style}
      {...attributes}
      {...listeners}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="96"
        viewBox="0 0 48 96"
        fill="none"
      >
        <g clip-path="url(#clip0_1845_26893)">
          <rect width="48" height="96" rx="12" fill="white" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 12C0 5.37258 5.37258 0 12 0H36C42.6274 0 48 5.37258 48 12V84C48 90.6274 42.6274 96 36 96H12C5.37258 96 0 90.6274 0 84V12ZM29 19.5L42 7.49999V17.5L29 29.5V19.5ZM42 37.5L29 49.5V59.5L42 47.5V37.5ZM29 79.5L42 67.5V77.5L29 89.5V79.5ZM6 7.49999L19 19.5V29.5L6 17.5V7.49999ZM19 49.5L6 37.5V47.5L19 59.5V49.5ZM6 67.5L19 79.5V89.5L6 77.5V67.5Z"
            fill="#242424"
          />
        </g>
        <defs>
          <clipPath id="clip0_1845_26893">
            <rect width="48" height="96" rx="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export const SectionItem = (props) => {
  const { id, items, name, data, isSortingContainer, dragOverlay } = props;
  const disabled = items.length > 1;
  const { setNodeRef } = useDroppable({
    id,
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      className="kanban-column"
    >
      <div className={styles["kanban__column--list"]}>
        <SortableContext
          id={id}
          items={items}
          disabled={disabled}
          strategy={verticalListSortingStrategy} // verticalListSortingStrategy rectSortingStrategy
        >
          {items.map((item, _index) => {
            return (
              <FieldItem
                id={item}
                key={item}
                item={data.filter((d) => d.id === item)[0]}
                // disabled={disabled}
              />
            );
          })}
        </SortableContext>
      </div>
    </div>
  );
};

const Home = () => {
  const [items, setItems] = useState({
    container1: table1?.map(({ id }) => id),
    container2: table2?.map(({ id }) => id),
    container3: table3?.map(({ id }) => id),
  });

  const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;

    if (over === null) return;

    const { id } = active;

    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    let overContainer = findContainer(overId);

    if (activeContainer !== undefined && overContainer === undefined) {
      const activeIndex = items[activeContainer].indexOf(active.id);
      const newItems = items[activeContainer].filter(
        (item) => item !== active.id,
      );

      setItems((items) => ({
        ...items,
        container1: [activeIndex],
        container2: newItems,
      }));
    }
    // else {
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex,
        ),
      }));
    }
    //}
    setActiveId(null);
  }

  return (
    <div>
      Home
      <DndContext
        sensors={sensors}
        // modifiers={[restrictToWindowEdges]}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={rectIntersection}
      >
        <Row>
          <Col span={12}>
            <Table.DraggableRow
              localStorageKey="container1"
              allData={[...table1, ...table2, ...table3]}
              dataSource={items.container1}
              columns={columns}
            />
          </Col>
          <Col span={12}>
            <Table.DraggableRow
              localStorageKey="container2"
              allData={[...table1, ...table2, ...table3]}
              dataSource={items.container2}
              columns={columns}
            />
          </Col>
          <Col span={12}>
            <SectionItem
              id="container3"
              key="container3"
              items={items.container3}
              name="Ban"
              data={[...table1, ...table2, ...table3]}
              isSortingContainer={false}
            />
          </Col>
        </Row>
        <DragOverlay>
          {activeId ? <Item data={{ id: activeId }} id={activeId} items={items} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Home;
