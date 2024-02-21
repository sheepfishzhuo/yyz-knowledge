# Open3D 读取、保存、显示点云


## 一、主要函数


### 1、读取点云

```python
read_point_cloud(filename, format='auto', remove_nan_points=True, remove_infinite_points=True, print_progress=False): 
```

  从文件读取点云。 当用户不填写点云的扩展名时,会自动解码;若填写它尝试根据扩展名对文件进行解码。


* `filename`：点云文件的路径
* `format`：输入文件的格式。如果未指定或设置为“auto”，则从文件扩展名推断格式。默认参数为:auto
* `remove_nan_points`：默认参数为True，表示将从点云中删除包含NaN的所有点。
* `remove_infinite_points`：默认参数为True，表示将从点云中删除包含无限值的所有点。
* `print_progress`：默认参数为：False，如果设置为True，则在控制台中可视化进度条
* `read_point_cloud` 用来读取点云数据。Open3D通过文件扩展名来解码文件。支持的扩展名是：`pcd`, `ply`, `xyz`,`xyzrgb`, `xyzn`, `pts`。默认情况下，Open3D尝试通过文件扩展名推断文件类型。


### 2、保存点云

```python
write_point_cloud(filename, pointcloud, write_ascii=False, compressed=False, print_progress=False):
```

  保存点云到本地文件夹。


* `filename`：点云文件的路径
* `pointcloud`：待保存的点云
* `write_ascii`：默认参数为:False。设置为True 则以ascii格式输出，否则将使用二进制格式。
* `compressed`：默认参数为:False。设置为True 则表示以压缩格式写入保存点云。
* `print_progress`：默认参数为：False，如果设置为True，则在控制台中可视化进度条


### 3、显示点云

```python
draw_geometries(window_name='Open3D', width=1920, height=1080, left=50, top=50, point_show_normal=False, mesh_show_wireframe=False, mesh_show_back_face, \*args, \*\*kwargs):
```

   可视化点云。 使用鼠标/触控板从不同的角度查看几何图形。按H键为GUI打印出键盘指令的完整列表。


* `window_name`：可视化窗口的显示标题。
* `width`：可视化窗口的宽度。
* `height`：可视化窗口的高度。
* `left`：可视化窗口的左边距。
* `top`：可视化窗口的上边距。
* `point_show_normal`：如果设置为true，则可视化点法线。
* `mesh_show_wireframe`：如果设置为true，则可视化网格线框。
* `mesh_show_back_face`：可视化网格三角形的背面。


### 4、Open3D支持的点云格式


| 格式 | 描述 |
| --- | --- |
| `xyz` | 每一行包含`[x,y,z]`，其中`x,y,z`是三维坐标 |
| `xyzn` | 每一行包含`[x,y,z,nx,ny,nz]`，其中`nx,ny,nz`是法向量 |
| `xyzrgb` | 每一行包含`[x,y,z,r,g,b]`，其中`r,g,b`取值范围是`[0,1]` |
| `pts` | 第一行是表示点数的整数。随后的行遵循以下一种格式：`[x, y, z, i, r, g, b]` ,`[x, y, z, r, g, b]`,`[x, y, z, i]`或`[x, y, z]`。其中`x,y,z,i`是`double`类型,`r,g,b`是`uint8`类型。 |
| `ply` | 见：[多边形文件格式](http://paulbourke.net/dataformats/ply/)，`ply`文件可同时包含点云和网格数据。 |
| `pcd` | 见：[点云数据](http://pointclouds.org/documentation/tutorials/pcd_file_format.html)。 |


还可以读取指定文件类型，在这种情况下，文件扩展名将被忽略。

```python
pcd = o3d.io.read_point_cloud("飞机.txt", format='xyz')
```

### 5、输出点云信息


* `print(pcd)`输出点云的点的个数
* `print(o3d.np.asarray(pcd.points))`输出点云中点的三维坐标


## 二、代码实现（包括读取txt格式）

### 1、读取常见点云

```python
import open3d as o3d
import numpy as np
pcd = o3d.io.read_point_cloud("bunny.pcd")
print(pcd)#输出点云点的个数
print(np.asarray(pcd.points))#输出点的三维坐标
print('给所有的点上一个统一的颜色，颜色是在RGB空间得[0，1]范围内得值')
pcd.paint_uniform_color([0, 1, 0])
o3d.io.write_point_cloud("copy\_of\_fragment.pcd", pcd)
o3d.visualization.draw_geometries([pcd])
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826072947453.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FF0000,t_70#pic_center)

### 2、读取txt格式的点云

```python
import open3d as o3d
import numpy as np
pcd = o3d.io.read_point_cloud("飞机.txt", format='xyz')
print(pcd)#输出点云点的个数
print(np.asarray(pcd.points))#输出点的三维坐标
print('给所有的点上一个统一的颜色，颜色是在RGB空间得[0，1]范围内得值')
pcd.paint_uniform_color([0, 1, 0])
o3d.io.write_point_cloud("copy\_of\_fragment.pcd", pcd)
o3d.visualization.draw_geometries([pcd])
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210129194903211.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FF0000,t_70#pic_center)

### 3、可视化两个点云

> [【Open3d】使用open3d可视化](https://blog.csdn.net/suyunzzz/article/details/105183824)

```python
import open3d as o3d
#====================读取点云数据===================
source = o3d.io.read\_point\_cloud("路口1A.pcd")
target = o3d.io.read\_point\_cloud("路口2A.pcd")

#================可视化两个点云====================
def view\_cloud(source, target):
    source.paint\_uniform\_color([1, 0, 0])
    target.paint\_uniform\_color([0, 1, 0])
    o3d.visualization.draw\_geometries([source, target])
view\_cloud(source, target)
```

### 4、给点云随机赋色

```python
import open3d as o3d
import numpy as np

pcd = o3d.io.read\_point\_cloud("Armadillo.ply")
pcd.colors = o3d.utility.Vector3dVector(np.random.uniform(0, 1, (1,3)))
o3d.visualization.draw\_geometries([pcd])
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201204172833240.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FF0000,t_70)

### 5.显示点云自身的颜色

```python
import open3d as o3d
import numpy as np
pcd = o3d.io.read_point_cloud("tree1.pcd")
print(pcd)#输出点云点的个数
print(np.asarray(pcd.points))#输出点的三维坐标
o3d.io.write_point_cloud("copy\_of\_fragment.pcd", pcd)
o3d.visualization.draw_geometries([pcd],width=800,height=800)
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210129195623385.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FF0000,t_70#pic_center)

