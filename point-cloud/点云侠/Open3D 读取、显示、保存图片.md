# Open3D 读取、显示、保存图片


## 一、主要函数

1、Open3D中`img = o3d.io.read_image("y7.png")`实现图片图像数据的读取，支持的图片格式为`jpg`、`png`；
 2、图像的大小可以很容易地使用`print(img)`来获取；
 3、`o3d.io.write_image("天使.jpg", img)`实现图片的保存、支持的图片格式为`jpg`、`png`；
 4、`o3d.visualization.draw_geometries()`实现图片的显示。


## 二、代码实现

```python
import open3d as o3d

print("Testing IO for images")
img = o3d.io.read_image("y7.png")  # 读取图片（支持jpg和png格式）
print(img)  # 图片大小
o3d.io.write_image("天使.jpg", img)  # 保存图片
o3d.visualization.draw_geometries([img], window_name="Open3D显示图像",
                                  width=1024, height=768,
                                  left=50, top=50,
                                  mesh_show_back_face=False)  # 显示图片
```

## 三、结果展示


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210129212151835.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FF0000,t_70#pic_center)
