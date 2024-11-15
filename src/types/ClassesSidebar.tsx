import React from "react";
import { TreeItem, SimpleTreeView } from "@mui/x-tree-view";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Method, ClassType } from "./Utils";
import { useTheme } from "styled-components";

export const ClassesSidebar: React.FC<{
  classes: ClassType[];
  className: string;
  functionName: string;
  updateMethod: (m: Method, name: string) => any;
}> = ({ classes, updateMethod, className, functionName }) => {
  const allNodeIds = classes?.map((classItem) => classItem?.name); // Get all node IDs
  const theme = useTheme();
  return (
    <span id="treeview3" className="tree">
      <SimpleTreeView
        slots={{
          collapseIcon: RemoveCircleOutlineIcon,
          expandIcon: AddCircleOutlineIcon,
        }}
        defaultExpandedItems={allNodeIds}
      >
        {classes.map((classItem) => (
          <TreeItem itemId={classItem.name} key={classItem.name} label={classItem.name} className="text-dark">
            {classItem.ast.methods.map((method) => {
              return (
                <TreeItem
                  itemId={classItem.name + method.name}
                  key={classItem.name + method.name}
                  label={method.name}
                  onClick={() => updateMethod(method, classItem.name)}
                  style={{
                    color: `${className === classItem.name && functionName === method.name ? theme.colors.darkPurple200 : theme.colors.white}`,
                  }}
                />
              );
            })}
          </TreeItem>
        ))}
      </SimpleTreeView>
    </span>
  );
};
