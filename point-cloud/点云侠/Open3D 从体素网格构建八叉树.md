# Open3D 从体素网格构建八叉树


## 一、主要函数


###  1、体素网格


  关于体素网格，见：[Open3D 点云和三角网的体素化](https://blog.csdn.net/qq_36686437/article/details/110662957)


###  2、从体素网格构建八叉树


  函数`create_from_voxel_grid(voxel_grid)`从Open3D的`VoxelGrid`几何结构中构造八叉树。 输入VoxelGrid的每个体素都被视为3D空间中的一个点，其坐标对应于该体素的原点。 每个叶节点都采用其相应体素的颜色。


###  3、从八叉树构建体素网格


  函数`to_voxel_grid()`将`octree`转化为`VoxelGrid`


## 二、代码实现

```python
import open3d as o3d
import numpy as np

pcd = o3d.io.read_point_cloud("tree.pcd")
# 点云归一化到单位立方体中
pcd.scale(1 / np.max(pcd.get_max_bound() - pcd.get_min_bound()),
          center=pcd.get_center())

o3d.visualization.draw_geometries([pcd])
# 从点云中创建体素网格
print('voxelization')
voxel_grid = o3d.geometry.VoxelGrid.create_from_point_cloud(pcd,
                                                            voxel_size=0.01)
# 可视化体素网格
o3d.visualization.draw_geometries([voxel_grid])

# 初始化八叉树，最大树深设置为4
octree = o3d.geometry.Octree(max_depth=4)
# 从体素网格中构建八叉树
octree.create_from_voxel_grid(voxel_grid)
# 可视化八叉树
o3d.visualization.draw_geometries([octree])
# 从八叉树转换成网格
voxel_g = octree.to_voxel_grid().create_from_point_cloud(pcd,
                                                         voxel_size=0.01)
# 可视化体素网格
o3d.visualization.draw_geometries([voxel_g])
```

## 三、结果展示


###  1、原始点云


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407200155164.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center)


###  2、体素网格


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407200218641.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center)


###  3、八叉树


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407200236750.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center)


###  4、体素网格


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210407200254936.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center)





