# Open3D obj文件三维可视化

## 一、主要函数

1、面片显示
 2、顶点显示
 3、obj转np数组

## 二、代码实现

```python
import open3d as o3d
import numpy as np
# obj面片显示
obj_mesh= o3d.io.read_triangle_mesh('pikaqiu.obj')
print(obj_mesh)
mesh_frame = o3d.geometry.TriangleMesh.create_coordinate_frame(size=1, origin=[0, 0, 0])#添加坐标系
obj_mesh.compute_vertex_normals()
o3d.visualization.draw_geometries([obj_mesh,mesh_frame], window_name="Open3D1")
# obj顶点显示
pcobj = o3d.geometry.PointCloud()
pcobj.points = o3d.utility.Vector3dVector(obj_mesh.vertices)
o3d.visualization.draw_geometries([pcobj], window_name="Open3D2")
# obj顶点转array
obj_pc =np.asarray(obj_mesh.vertices)
print(obj_pc)
```

## 三、结果展示

1、面片显示
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201208205345463.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70)

2、顶点显示
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201208204334563.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70)  
 3、obj转array
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201208204422538.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70)
