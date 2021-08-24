---
layout: article
title:  "zapper-light #1"
date:   2021-08-24 19:15:09 +0900
categories: zapper-light
tech: [arduino]
---
로켓펀치 링링!

{% highlight c++ %}
#include <cstdio>
#include <vector>
#define MAX 1000
using namespace std;

vector<int> GRAPH[MAX+1];
vector<int> topological_sort;
bool visited[MAX+1];
int ROUTE[MAX+1];
int TIME[MAX+1];

int N, K, W;

void init()
{
  topological_sort.clear();
  for(int i = 0; i<=MAX; i++)
  {
    visited[i] = false;
    ROUTE[i] = 0;
    GRAPH[i].clear();
  }
}

void dfs(int here)
{
  visited[here] = true;
  for(int i = 0; i<GRAPH[here].size(); i++)
  {
    int next = GRAPH[here][i];
    if(!visited[next])
      dfs(next);
  }
  topological_sort.push_back(here);
}

void tps()
{
  for(int i = 1; i<=N; i++)
    if(!visited[i]) dfs(i);
}

int main()
{
  int tc;
  scanf(" %d", &tc);
  while(tc--)
  {
    int src, dst;
    init();
    scanf(" %d %d", &N, &K);
    for(int i = 1; i<=N; i++)
      scanf(" %d", &TIME[i]);
    for(int i = 0; i<K; i++)
    {
      scanf(" %d %d", &src, &dst);
      GRAPH[src].push_back(dst);
    }
    scanf(" %d", &W);
    tps();
    for(int i = topological_sort.size()-1; i>=0; i--)
    {
      int here = topological_sort[i];
      if(here == W)
        break;
      for(int j = 0; j<GRAPH[here].size(); j++)
      {
        int next = GRAPH[here][j];
        if(ROUTE[next] < ROUTE[here]+TIME[here])
          ROUTE[next] = ROUTE[here]+TIME[here];
      }
    }
    printf("%d\n", ROUTE[W]+TIME[W]);
  }
}
{% endhighlight %}