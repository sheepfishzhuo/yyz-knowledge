# Open3D Mesh读写可视化

## 一、主要函数


1、`mesh = o3d.io.read_triangle_mesh("UV.ply")`从文件中读取mesh，支持的文件格式有`ply`、`stl`、`obj`、`off`、`gltf/glb`


  与点云数据结构相比，网格具有定义三维表面的三角形。默认情况下，Open3D尝试通过文件名扩展名推断文件类型。支持以下mesh文件类型:


| 格式 | 描述 |
| :-: | :-: |
| `ply` | 见：[Polygon File Format,](http://www.open3d.org/docs/release/tutorial/geometry/file_io.html#Mesh)  |
| `stl` | 见：[The StL Format](http://www.fabbers.com/tech/STL_Format) |
| `obj` | 见：[Object Files (.obj)](http://paulbourke.net/dataformats/obj/) |
| `off` | 见：[OFF Files](http://www.open3d.org/docs/release/tutorial/geometry/file_io.html) |
| `gltf/glb` | 见：[GL Transmission Format](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0) |
| 2、`mesh.vertices`获取顶点 |  |
| 3、`mesh.triangles`获取三角面片 |  |
| 4、`o3d.visualization.draw_geometries([mesh])`可视化mesh |  |
| 5、`mesh.paint_uniform_color([1, 0.076, 0])`mesh渲染颜色，颜色在RGB空间[0，1]范围内。 |  |
| 6、`mesh.compute_vertex_normals()`计算mesh的法线 |  |


## 二、示例代码

**1、mesh**
 Open3D有一个用于三维三角形网格的数据结构，称为`TriangleMesh`。下面的代码显示如何从ply文件中读取并打印其顶点和三角形

```python
print("Testing mesh in Open3D...")
mesh = o3dtut.get_knot_mesh()
print(mesh)
print('Vertices:')
print(np.asarray(mesh.vertices))# 每个点的坐标xyz
print('Triangles:')
print(np.asarray(mesh.triangles))# 每个面的三个点的索引
```

这个`TriangleMesh`类有一些数据字段，如`vertices`和`triangles`。Open3D通过numpy提供了对这些字段的直接内存访问。
 **2、可视化mesh**

```python
print("Try to render a mesh with normals (exist: " +
      str(mesh.has_vertex_normals()) + ") and colors (exist: " +
      str(mesh.has_vertex_colors()) + ")")
o3d.visualization.draw_geometries([mesh])
print("A mesh with no normals and no colors does not look good.")
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020112017070979.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center)

可以旋转和移动网格，但是网格被涂成均匀的灰色，看起来不像“ 3d”。原因是当前网格没有顶点或面的法线。因此，使用统一的颜色底纹代替更复杂的Phong底纹。
 **3、计算法线**

```python
print("Computing normal and rendering it.")
mesh.compute_vertex_normals()
print(np.asarray(mesh.triangle_normals))
o3d.visualization.draw_geometries([mesh])
```

**4、mesh上色**

```python
print("Painting the mesh")
mesh.paint_uniform_color([1, 0.706, 0])
o3d.visualization.draw_geometries([mesh])
```

## 三、完整代码


实现mesh的读写颜色渲染等操作

```python
import open3d as o3d
import numpy as np

print("Testing mesh in Open3D...")
mesh = o3d.io.read_triangle_mesh("E://data//UV.ply")
count = len(np.asarray(mesh.vertices))
if count == 0:  # 如果没读取到数据则退出程序
    exit()
print(len(np.asarray(mesh.vertices)))  # 打印点数和三角面数
print('Vertices:')
print(np.asarray(mesh.vertices))  # 输出每个顶点的坐标xyz
print('Triangles:')
print(np.asarray(mesh.triangles))  # 每个面的三个点的索引
# o3d.io.write\_triangle\_mesh("copy\_of\_knot.ply", mesh) # 保存mesh
print("Computing normal and rendering it.")
mesh.compute_vertex_normals()
print(np.asarray(mesh.triangle_normals))
mesh.paint_uniform_color([1, 0.7, 0])  # 给mesh渲染颜色
o3d.visualization.draw_geometries([mesh], window_name="Open3D显示mesh模型",
                                  width=1024, height=768,
                                  left=50, top=50,
                                  mesh_show_wireframe=True,  # 是否以格网线的形式显示
                                  mesh_show_back_face=False  # 是否显示面片背景
                                  )  # 显示mesh模型
```

## 四、结果展示

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201120171347820.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center) 
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/1452dcd042f14dbd87990eed9e139a07.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70)


## 五、官网链接


[mesh](http://www.open3d.org/docs/release/tutorial/geometry/mesh.html)
