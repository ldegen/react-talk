while read p; do 
  sleep 0.1
  if [ -z $1 ]; then
    echo "$p"
  else
    echo -n "$p"$'\r'
  fi
done <<EOF
 5%  [==                              ]
10%  [====                            ]
16%  [======                          ]
21%  [=======                         ]
27%  [=========                       ]
32%  [===========                     ]
38%  [=============                   ]
44%  [===============                 ]
50%  [=================               ]
56%  [==================              ]
62%  [====================            ]
68%  [======================          ]
74%  [========================        ]
79%  [==========================      ]
85%  [============================    ]
91%  [==============================  ]
97%  [================================]
100% [================================]


EOF

cat <<EOF
Copied: 10485760B (10.0MB) (100% of expected input)
Time: 19 seconds
Throughput: 551882B (538.9KB/s)
EOF
