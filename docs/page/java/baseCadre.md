# java语法结构(流程控制)

> 顺序结构
>
> 分支结构 => `if else 、switch `
>
> 循环结构 => `for 、while 、 do while`

1. 单分支

```
单分支 if else
	Math.random() //范围是是 [0,1) 左闭右开
	if(值=>boolean)
	        单行语句/{多行语句}
			//单行语句不需要大括号
	if(值){
		执行 单行 多行
	}

	if(条件){
		代码1
	}else{
		代码2
	}
	if(boolean){
	
	}else if(boolean){
	
	}
	
多分支 switch
	switch(值){// 这里值只能是这些类型  byte  short  int  char    1.5版本后支持enum   1.7版本后支持String
        case 值1:
            代码1;
            [break;] 可有可无
        case 值2:
            代码2;
        default:
            代码
	}
//如果上面案例值为1 里面代码没有结束语句那么后面代码会被全部执行 除非遇到 break return continue 跳槽循环

```

> **if**	好处 (可以写复杂的逻辑)	不好处 执行比较慢
> **switch**	好处 (判断的过程效率更高)	不好处 只能做==(固定值)



2. 循环结构

```
for 允许将三个必要条件都写在()内 也可将定义变量和改变变量的值不写在括号里面

//方式一 //循环完成 a变量会销毁
for(int a=1;a<=10;a++){}

//方式二 //由于a定义在外面 所有不会在循环完成后销毁
int a = 1;
for(;a<=10;a++){}

//方式三 // 冒号不能省略
int a = 1;
for(;a<=10;){
a++
}

//通过循环找寻三位数字的水仙花数
public class DemoThree{
	public static void main(String[] args){
		//double value = Math.pow(double a , double b);//帮我们计算a的b次方
		/*for(int num=100;num<1000;num++){
			int b = num/100;   //int 返回一个整数
			int s = num/10%10;//   num%100/10;
			int g = num%10;
			if(b*b*b+s*s*s+g*g*g==num){
				System.out.println(num+"是水仙花数");
			}
		}*/
		for(int num=100;num<1000;num++){
			if(Math.pow(num/100,3)+Math.pow(num%100/10,3)+Math.pow(num%10,3)==num){
				System.out.println(num+"是水仙花数");
			}
		}
	}
}
//小鸡  小兔子 关在同一个笼子里    小鸡两只脚  小兔子四只脚
//小鸡+小兔子 总数 50只    脚的总数160只
//求 小鸡 和 小兔子各多少只。
public class DemoTwo{
	public static void main(String[] args){
		for(int x=1;x<50;x++){
			if(x*2+(50-x)*4 ==160){
				System.out.println("小鸡的个数为:"+x);
				System.out.println("小兔子个数为:"+(50-x));
			}
		}
	}
}

```

3. 双重for循环案例

```
import java.util.Scanner;

public class Demo1{
	public static void main(String[] args){
		//*******	画星星 换行		i==1        4-->7    5-->9
		//*** ***  画星星  画空格  画星星  换行	i==2    3   1   3
		//**    **  画星星  画空格  画星星  换行	i==3    2   3   2
		//*       *  画星星  画空格  画星星  换行	i==4    1   5   1
		//可读性 健壮性(严谨) 优化(结构 冗余 性能 内存 复用 扩展)  2*i-3
		Scanner input = new Scanner(System.in);
		System.out.println("请您输入行数:");
		int line = input.nextInt();
		for(int i=1;i<=line;i++){//控制行数
			if(i==1){//第一行规则
				//画星星
				for(int j=1;j<=2*line-1;j++){
					System.out.print("*");
				}
			}else{//后三行规则
				//画星星
				for(int j=1;j<=(line+1)-i;j++){
					System.out.print("*");
				}
				//画空格
				for(int j=1;j<=2*i-3;j++){
					System.out.print(" ");
				}
				//画星星
				for(int j=1;j<=(line+1)-i;j++){
					System.out.print("*");
				}
			}
			//换行
			System.out.println();
		}
	}
}

public class Demo2{
	public static void main(String[] args){
		//数字金字塔                         空格   左边   右边
		//       1		i==1	3    1-1    0
		//     12  1	i==2	2    1-2    1-1
		//   123  21	i==3	1    1-3    2-1
		// 1234  321	i==4	0    1-4    3-1
		for(int i=1;i<=4;i++){//控制行数
			//空格占位
			for(int j=1;j<=4-i;j++){
				System.out.print(" ");
			}
			//左边数字   改变--利用变量  利用循环里层的变量j来控制  j++
			for(int j=1;j<=i;j++){
				System.out.print(j);
			}
			//右边数字   改变--利用j变量   j--
			for(int j=i-1;j>=1;j--){
				System.out.print(j);
			}
			//换行
			System.out.println();
		}
	}
}

public class Demo3{
	public static void main(String[] args){
		//打印输出9*9乘法表
		//1*1=1		表达式当做--?
		//1*2=2  2*2=4
		//1*3=3  2*3=6  3*3=9
		//   j  + "*" +   i + "=" +     j*i
		//被乘数  *  乘数  =  乘积
		//在一行之中  被乘数发生变化 j  乘数固定  i
		for(int i=1;i<=9;i++){//控制行数
			//画一个?
			for(int j=1;j<=i;j++){//控制每一行表达式的个数
				System.out.print(j+"*"+i+"="+(j*i)+"\t");
			}
			//换行
			System.out.println();
		}
	}
}


public class Demo4{
	public static void main(String[] args){
		//素数：只能被1和自身整除的数
		// 2-100之间的素数  每一个数字做一个输出
		for(int num=2;num<=100;num++){
			//先把1和本身这两个数字  刨除掉
			//在剩下的数字中挨个找寻一遍  看一看还有没有其他的整除数字
			boolean x = false;//标识干净的裤子  //内存空间小
			for(int i=2;i<=num/2;i++){//在其余的数字中挨个找寻 还有没有能整除的
				if(num%i==0){
					System.out.println(num+"不是素数");
					x = true;//相当于标识修改啦 变脏啦
					break;//不是中断if  当满足if条件的时候中断循环
				}
			}
			if(x==false){
				System.out.println(num+"是素数");
			}
		}
	}
}


```

4. break 和 continue

   给循环命名 `name:for()` 名称为name 

   `break`：跳出**当前**循环体 结束当前循环  break [name] break后面更循环名字就是结束指定循环

   `continue`：跳出**本次**循环 继续后面循环  continue[name] continue后面更循环名字就是结束指定循环

   如果循环又嵌套 有没有指定结束的循环 那么使用循环结束符 结束的是离他最近的哪一个循环

   案例：

   ```
   public class TestBreakAndContinue{
   	public static void main(String[] args){
   		int i=1;
   		int j=1;
   		//给循环命名 ok:for 名称就是 ok
   		ok:for(;i<=5;i++){
   			ko:for(;j<=5;j++){
   				if(j==3){
   					continue ok;
   				}//j==3停住一次 继续下一次i++  i=2
   				System.out.println("拓哥再帅一次");
   			}
   		}
   		//执行输出多少次10   执行完毕 i6  j3?
   		System.out.println(i);
   		System.out.println(j);
   
   
   
   		/*
   		int i=1;
   		int j=1;
   		ok:for(;i<=5;i++){
   			ko:for(;j<=5;j++){
   				if(j==3){
   					break ok;
   				}
   				System.out.println("拓哥就是很帅");
   			}
   		}
   		System.out.println(i);
   		System.out.println(j);
   		//输出几次2    i j分别是几?1  3
   		//break为什么终断是里层循环?    不看层次问题    两个循环一模一样
   		//如果j==3时候   break终断外面的循环----???   给循环起名字  循环标记
   		*/
   	}
   }
   ```

   

5. while 和 do...while

   while：先判断后执行  条件不满足不执行啦

   do..while：先执行后判断  条件不满足 至少执行一次

   ```
   循环想要执行 需要三个必要条件  初始值  终点判定条件  变化量
   	for( 1初始值 ; 2终点判定条件 ; 4变化量 ){
   		3好多好多执行;
   	}
   	允许将三个条件都写在()内  但 不是必须 例如下面这种写法
    
   	初始值 ;
   	for( ; 终点判定条件 ; ){
   		好多好多执行;
   		变化量 ;
   	}
   	
   	
   	初始值;
   	while(终点判定条件){// ()内只允许写一个
   		好多好多执行;
   		变化量;
   	}
   	
   	初始值;
   	do{
   		好多好多执行;
   		变化量;
   	}while(终点判定条件);
   	
   	
   	我理解就是一个for循环的变体   
   	变量定义在循环外 生命周期长了  
   	变化量放在循环内(注意上下的顺序可能对执行产生影响)
   	
   	public class TestWhile{
   	public static void main(String[] args){
   		//例一
   		int i = 1;
   		while(i<=4){
   			//画空格占位
   			int j = 1;
   			while(j<=4-i){
   				System.out.print(" ");
   				j++;
   			}
   			//画星星
   			int k = 1;
   			while(k<=2*i-1){
   				System.out.print("*");
   				k++;
   			}
   			//换行
   			System.out.println();
   			i++;
   		}
   
   		//例二
   		/*
   		int sum = 120;//表示水池中的水
   		int hour = 0;//记录经过小时数 ?
   		while(sum>0){
   			sum+=18;
   			sum-=30;
   			hour++;//记录一次小时数
   			System.out.println("本次循环完毕:"+sum);
   		} 
   		System.out.println("经过"+hour+"小时排水完毕");
   		/*
   		
   		
   		//例三
   		/*
   		int i = 10;
   		do{
   			System.out.println("执行ing:"+i);//12345
   			i++;
   		}while(i<=5);
   		*/
   
   		/*
   		int i = 10;
   		while(i<=5){
   			System.out.println("执行ing:"+i);//12345
   			i++;
   		}
   		System.out.println("执行完毕:"+i);
   		//执行输出什么? 执行完毕后 i==？
   		*/
   	}
   }
   ```

   

