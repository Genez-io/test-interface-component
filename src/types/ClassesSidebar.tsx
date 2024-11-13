import React from "react";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Method, ClassType } from "./Utils";

export const ClassesSidebar: React.FC<{
  classes: ClassType[];
  className: string;
  functionName: string;
  updateMethod: (m: Method, name: string) => any;
}> = ({ classes, updateMethod, className, functionName }) => {
  const allNodeIds = classes?.map((classItem) => classItem?.name); // Get all node IDs
  return (
    <span id="treeview3" className="tree">
      <TreeView
        defaultCollapseIcon={<RemoveCircleOutlineIcon />}
        defaultExpandIcon={<AddCircleOutlineIcon />}
        defaultExpanded={allNodeIds}
      >
        {classes.map((classItem) => (
          <TreeItem nodeId={classItem.name} key={classItem.name} label={classItem.name} className="text-dark">
            {classItem.ast.methods.map((method) => {
              return (
                <TreeItem
                  nodeId={classItem.name + method.name}
                  key={classItem.name + method.name}
                  label={method.name}
                  onClick={() => updateMethod(method, classItem.name)}
                  className={
                    className === classItem.name && functionName === method.name ? "text-primary" : "text-dark"
                  }
                />
              );
            })}
          </TreeItem>
        ))}
      </TreeView>
    </span>
  );
};
