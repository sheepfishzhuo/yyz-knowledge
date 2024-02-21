# Open3D Python版本快速安装和使用


## 一、什么是Open3D

Open3D是一个开源库，支持快速开发和处理3D数据。Open3D在c++和Python中公开了一组精心选择的数据结构和算法。后端是高度优化的，并且是为并行化而设置的。
 其核心特性包括：
 3D数据结构
 3D数据处理算法
 场景重建
 表面对齐
 3D可视化
 基于物理的渲染（PBR）
 C++和python代码接口
 本博客主要介绍Open3D的python版本使用，更多信息可以浏览Open3D官方文档和GitHub


## 二、Python版本快速安装和使用

本人的安装环境为：**WIN10+Python3.8.2+PyCharm 2019.3.3 x64** 
 **通过pip安装Open3D** 
 1、打开Python3.8.2的安装路径找到**Scripts**文件夹，并打开。  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200603174909578.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70) 
 2、在**Scripts**文件夹中的如下位置，输入`cmd`然后按下Enter键  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200603175329398.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70) 
 3、打开cmd窗口  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200603175533793.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70) 
 4、在cmd窗口中输入：`pip install open3d`  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200603175840124.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70) 
 5、根据网速不同，安装时间也不同，稍作等待即可安装成功。当安装完成后测试安装是否成功

```
python -c "import open3d as o3d"
```

如果没有报错，则安装成功。
 通过Anaconda安装open3d的方法见：[Windows系统下python版本Open3D-0.18.0 的快速安装与使用](https://blog.csdn.net/qq_36686437/article/details/135511335)


## 三、测试代码

**灯.pcd为测试数据，需要下载下来放在代码所在的路径下。**

```python
import open3d as o3d
import numpy as np

print("读取点云并可视化")
pcd = o3d.io.read_point_cloud("灯.pcd")
print(pcd)
print(np.asarray(pcd.points))
o3d.visualization.draw_geometries([pcd])
```

## 四、结果展示

```
读取点云并可视化
PointCloud with 1990 points.
[[-5.26299998e-02  4.50709999e-01 -7.98000023e-03]
 [-1.96599998e-02 -2.30999989e-03 -7.47000007e-03]
 [-3.93299982e-02  6.62999973e-02 -1.10000001e-04]
 ...
 [ 3.63700017e-02  3.74599993e-01  5.30999992e-03]
 [ 6.05800003e-02  3.40400010e-01  7.06000021e-03]
 [ 9.60099995e-02  4.06239986e-01  1.56399999e-02]]
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/562f61fc6d7d4df2840a276f1b21b71e.png#pic_center)


## 五、测试数据

链接：<https://pan.baidu.com/s/1NptQuyUCAqjnOtbOSC16aA>
 提取码：9vmu
