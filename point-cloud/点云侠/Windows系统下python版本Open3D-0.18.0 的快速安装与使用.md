# Windows系统下python版本Open3D-0.18.0 的快速安装与使用

## 一、安装Anaconda3


见：[Anaconda详细安装及使用教程（带图文）](https://blog.csdn.net/ITLearnHall/article/details/81708148)


## 二、安装open3d

**题外话：自认为很聪明觉得Open3D与open3d不是一个东西的杠精请自觉拉黑，鄙人才疏学浅，惹不起！！！**
   单击电脑的"开始"按钮找到Anaconda3的如下界面：
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/1bf9b97776c44c7f805492bffaedef8d.png#pic_center)

单击红框中的选项，打开如下界面
![在这里插入图片描述](https://img-blog.csdnimg.cn/178fa006be114d228c78d4d41554fca7.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2Njg2NDM3,size_16,color_FFFFFF,t_70#pic_center) 
 输入：

```
pip install -U -f https://www.open3d.org/docs/latest/getting_started.html open
```

根据网速不同，安装时间也不同，稍作等待即可安装成功。当安装完成后测试安装是否成功

```
python -c "import open3d as o3d"
```

如果没有报错，如下图所示，则安装成功。  
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/828969101b064eaabcf8b2ab3e9ca9f5.png#pic_center)


## 三、测试代码

**灯.pcd为测试数据，需要下载下来放在代码所在的路径下。**

```python
import open3d as o3d
import numpy as np

print("读取点云并可视化")
pcd = o3d.io.read_point_cloud("E://data//灯.pcd")
count = len(np.asarray(pcd.points))
if count == 0:  # 如果没读取到数据则退出程序
    print('点云读取失败！！！')
    exit()
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
